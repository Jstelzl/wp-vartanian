import unique from 'unique-selector';
import getXPath from 'get-xpath';

export class SmushLCPDetector {
	constructor(cdnBaseUrl) {
		this.cdnBaseUrl = typeof cdnBaseUrl === 'string' ? cdnBaseUrl : '';
		this.useRelativeImageURL = false;
	}
	onLCP(data) {
		const element = data?.entries[0]?.element;
		let imageUrl = data?.attribution?.url;
		if (!element || !imageUrl) {
			return;
		}

		const selector = unique(element);
		const xpath = getXPath(element, {ignoreId: true});
		if (
			this.cdnBaseUrl && imageUrl.startsWith( this.cdnBaseUrl ) &&
			element.nodeName === 'IMG' &&
			element.src &&
			/(?:\?|&)size=\d+x0\b/.test( imageUrl )
		) {
			imageUrl = element.src;
		}
		this.useRelativeImageURL = this.shouldUseRelativeImageURL( element, imageUrl );
		const body = {
			url: window.location.href,
			data: JSON.stringify({
				selector: selector,
				selector_xpath: xpath,
				selector_id: element?.id,
				selector_class: element?.className,
				image_url: this.useRelativeImageURL ? this.makeImageURLRelative( imageUrl ) : imageUrl,
				background_data: this.getBackgroundDataForElement( element ),
			} ),
			nonce: smush_detector.nonce,
			is_mobile: smush_detector.is_mobile,
			data_store: JSON.stringify(smush_detector.data_store),
			previous_data_version: smush_detector.previous_data_version,
			previous_data_hash: smush_detector.previous_data_hash,
		};

		const xhr = new XMLHttpRequest();
		xhr.open('POST', smush_detector.ajax_url + '?action=smush_handle_lcp_data', true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		const urlEncodedData = Object.keys(body)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
			.join("&");
		xhr.send(urlEncodedData);
	}

	shouldUseRelativeImageURL( element, absoluteImageUrl ) {
		if ( ! element?.outerHTML ) {
			return false;
		}

		const outerHTML = element.outerHTML;
		const containsAbsoluteUrl = outerHTML.includes( absoluteImageUrl );

		if ( containsAbsoluteUrl ) {
			return false;
		}

		const relativeImageUrl = this.makeImageURLRelative( absoluteImageUrl );
		const containsRelativeUrl = outerHTML.includes( relativeImageUrl );

		return containsRelativeUrl;
	}

	makeImageURLRelative( imageUrl ) {
		try {
			const url = new URL( imageUrl, window.location.origin ); // Parse the URL
			if ( url.hostname === window.location.hostname ) {
				// Only make the URL relative if it belongs to the current host
				return url.pathname + url.search; // Keep the path and query string
			}
		} catch ( e ) {
			// If the URL is invalid or relative, return it as-is.
		}

		return imageUrl; // Return the original URL if it doesn't belong to the host
	}

	getBackgroundDataForElement(element) {
		const computedStyle = window.getComputedStyle(element, null);
		const backgroundProps = [
			computedStyle.getPropertyValue("background-image"),
			getComputedStyle(element, ":after").getPropertyValue("background-image"),
			getComputedStyle(element, ":before").getPropertyValue("background-image")
		].filter((prop) => prop !== "none");
		if (backgroundProps.length === 0) {
			return null;
		}

		return this.getBackgroundDataForPropertyValue(backgroundProps[0]);
	}

	getBackgroundDataForPropertyValue( fullBackgroundProp ) {
		if ( ! fullBackgroundProp || fullBackgroundProp === '' || fullBackgroundProp.includes( 'data:image' ) ) {
			return null;
		}

		if ( fullBackgroundProp.includes( 'image-set(' ) ) {
			return this.parseImageSet( fullBackgroundProp );
		}
		return this.parseBackgroundUrl( fullBackgroundProp );
	}

	parseImageSet( fullBackgroundProp ) {
		const type = 'background-image-set';
		// Matches image-set candidates like:
		// url("https://...") 1x, "..." 2x, url('/...') 1.5x, url('./...') 2dppx, ... type("image/avif")
		const imageSetRegex = /(?:url\(\s*)?['"]?((?:https?:\/\/|\/\/|\/|\.\.?\/)[^\s'",)]+\.(?:jpe?g|png|gif|webp|svg|avif)(?:\?[^\s'",)]+)?)[\s'")]*\)?\s*((?:\d*\.?\d+(?:x|dppx))?)\s*(?:type\(\s*['"]?([^)]+?)['"]?\s*\))?/ig;
		const matches = [];
		let match;
		while ( ( match = imageSetRegex.exec( fullBackgroundProp ) ) !== null ) {
			let resolution = match[ 2 ] || '';
			// Convert dppx to x.
			if ( resolution && resolution.endsWith( 'dppx' ) ) {
				resolution = resolution.replace( 'dppx', 'x' );
			}
			matches.push( {
				url: match[ 1 ],
				resolution,
				type: match[ 3 ] || ''
			} );
		}

		if ( matches.length > 0 ) {
			return {
				type,
				image_urls: matches
			};
		}

		return null;
	}

	parseBackgroundUrl( fullBackgroundProp ) {
		const type = 'background-image';
		// IMPORTANT: keep this regex in sync with the PHP Parser::get_image_urls
		const cssBackgroundUrlRegex = /((?:https?:\/|\.+)?\/[^'",\s()]+\.(jpe?g|png|gif|webp|svg|avif)(?:\?[^\s'",?)]+)?)\b/ig;
		const matches = [ ...fullBackgroundProp.matchAll( cssBackgroundUrlRegex ) ];
		const backgroundSet = matches.map( ( match ) => {
			const imageURL = match[ 1 ].trim();

			return this.useRelativeImageURL
				? this.makeImageURLRelative( imageURL )
				: imageURL;
		} );

		if ( backgroundSet.length <= 0 ) {
			return null;
		}

		return {
			type,
			image_urls: backgroundSet.map( ( url ) => ( { url, resolution: '', type: '' } ) ),
		};
	}
}

(function () {
	let lcpEntry = null;
	let finalized = false;
	const initialViewportBottom = window.innerHeight;
	const pageLoadStartedAtTop = document?.documentElement?.scrollTop === 0;

	if (!pageLoadStartedAtTop || !('PerformanceObserver' in window)) {
		return;
	}

	const po = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			if (isInInitialViewport(entry)) {
				lcpEntry = entry; // always keep the latest candidate
			}
		}
	});

	try {
		po.observe({type: 'largest-contentful-paint', buffered: true});
	} catch (e) {
		// not supported
	}

	function finalizeLCP() {
		if (finalized) {
			return;
		}
		finalized = true;

		if (lcpEntry) {
			const detector = new SmushLCPDetector( smush_detector?.cdn_base_url ?? '' );
			detector.onLCP({
				entries: [lcpEntry],
				attribution: {
					url: lcpEntry.url || '',
					element: lcpEntry.element || ''
				}
			});
		}

		if (po) {
			po.disconnect();
		}
	}

	function isInInitialViewport(entry) {
		const el = entry && entry.element;
		if (!el) {
			return true;
		}
		const rect = el.getBoundingClientRect();
		const elementTop = rect.top + window.scrollY;
		return elementTop <= initialViewportBottom;
	}

	// Finalize on first *trusted* user input
	['keydown', 'click', 'pointerdown', 'touchstart'].forEach((type) => {
		addEventListener(type, (event) => {
			if (event.isTrusted) {
				finalizeLCP();
			}
		}, {once: true, capture: true});
	});
})();
