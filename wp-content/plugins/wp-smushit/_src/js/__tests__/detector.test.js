import { describe, expect, test, it } from '@jest/globals';
import { SmushLCPDetector } from '../frontend/detector';

describe( 'onLCP CDN base URL handling', () => {
	const cdnBaseUrl = 'https://b123456.assetcdn.net/2.0/123456/';

	beforeEach( () => {
		global.smush_detector = {
			nonce: 'nonce',
			is_mobile: false,
			data_store: {},
			previous_data_version: '1',
			previous_data_hash: 'hash',
			ajax_url: 'https://example.com/wp-admin/admin-ajax.php',
		};

		global.XMLHttpRequest = jest.fn().mockImplementation( () => ( {
			open: jest.fn(),
			setRequestHeader: jest.fn(),
			send: jest.fn(),
		} ) );
	} );

	afterEach( () => {
		jest.restoreAllMocks();
		document.body.innerHTML = '';
	} );

	const setupAndRun = ( attributionUrl ) => {
		const lcpDetector = new SmushLCPDetector( cdnBaseUrl );
		const host = document.createElement( 'div' );
		const img = document.createElement( 'img' );
		img.src = 'https://example.com/original.jpg';
		host.appendChild( img );
		document.body.appendChild( host );

		const shouldUseRelativeImageURLSpy = jest
			.spyOn( lcpDetector, 'shouldUseRelativeImageURL' )
			.mockReturnValue( false );

		lcpDetector.onLCP( {
			entries: [ { element: img } ],
			attribution: {
				url: attributionUrl,
			},
		} );

		return {
			img,
			host,
			shouldUseRelativeImageURLSpy,
		};
	};

	test.each( [
		[
			'replaces with element src when attribution URL starts with configured cdnBaseUrl and has auto size query',
			'https://b123456.assetcdn.net/2.0/123456/wp-content/uploads/2026/07/music-2.jpg?size=1024x0&lossy=1',
			'https://example.com/original.jpg',
		],
		[
			'replaces with element src when attribution URL starts with configured cdnBaseUrl and has explicit size query',
			'https://b123456.assetcdn.net/2.0/123456/wp-content/uploads/2026/07/music-2.jpg?size=1024x450&lossy=1',
			'https://b123456.assetcdn.net/2.0/123456/wp-content/uploads/2026/07/music-2.jpg?size=1024x450&lossy=1'
		],
		[
			'does not replace when attribution URL does not start with configured cdnBaseUrl',
			'https://example.com/wp-content/uploads/2025/03/WNL-343A40-256x96-1.png',
			'https://example.com/wp-content/uploads/2025/03/WNL-343A40-256x96-1.png',
		],
	] )( '%s', ( _description, attributionUrl, expectedImageUrl ) => {
		const { img, host, shouldUseRelativeImageURLSpy } = setupAndRun( attributionUrl );

		expect( shouldUseRelativeImageURLSpy ).toHaveBeenCalledWith( img, expectedImageUrl );
		host.remove();
	} );
} );

describe( 'background data from property value', () => {
	const dataSet = [
		[
			// background-image: url
			"url('http://localhost/wp-content/uploads/2024/08/image1.jpeg')",
			'background-image',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '',
					type: ''
				}
			]
		],
		[
			// background-image: url
			"url('http://localhost/wp-content/uploads/2025/10/image1.jpeg'), url('http://localhost/wp-content/uploads/2025/10/image2.png')",
			'background-image',
			[
				{
					url: 'http://localhost/wp-content/uploads/2025/10/image1.jpeg',
					resolution: '',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2025/10/image2.png',
					resolution: '',
					type: ''
				}
			]
		],
		[
			// background-image: relative url
			"url('/wp-content/uploads/2024/08/image1.jpeg')",
			'background-image',
			[
				{
					url: '/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '',
					type: ''
				}
			]
		],
		[
			// background-image: image-set
			'image-set(' +
			"'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg' 1x, " +
			"'http://localhost/wp-content/uploads/2024/08/image1.jpeg' 2x" +
			');',
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg',
					resolution: '1x',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '2x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set
			'image-set(' +
			"'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg' 1dppx, " +
			"'http://localhost/wp-content/uploads/2024/08/image1.jpeg' 2dppx" +
			');',
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg',
					resolution: '1x',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '2x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set with url
			'image-set(' +
			"url('http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg') 1x, " +
			"url('http://localhost/wp-content/uploads/2024/08/image1.jpeg') 2x" +
			');',
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg',
					resolution: '1x',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '2x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set query params
			'image-set(' +
			'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg?hello=world 1x, ' +
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg?yellow=world 2x' +
			');',
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg?hello=world',
					resolution: '1x',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg?yellow=world',
					resolution: '2x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set with relative URLs
			'image-set(' +
			"url('/wp-content/uploads/2024/08/image1-768x437.jpeg') 1x, " +
			"url('/wp-content/uploads/2024/08/image1.jpeg') 2x" +
			');',
			'background-image-set',
			[
				{
					url: '/wp-content/uploads/2024/08/image1-768x437.jpeg',
					resolution: '1x',
					type: ''
				},
				{
					url: '/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '2x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set with fractional descriptors
			'image-set(' +
			"url('http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg') 1.5x, " +
			"url('http://localhost/wp-content/uploads/2024/08/image1.jpeg') 2.5dppx" +
			');',
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.jpeg',
					resolution: '1.5x',
					type: ''
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '2.5x',
					type: ''
				}
			]
		],
		[
			// background-image: image-set
			`image-set(
				'http://localhost/wp-content/uploads/2024/08/image1-768x437.avif' type('image/avif'),
				'http://localhost/wp-content/uploads/2024/08/image1.jpeg' type('image/jpeg')
			);`,
			'background-image-set',
			[
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1-768x437.avif',
					resolution: '',
					type: 'image/avif'
				},
				{
					url: 'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
					resolution: '',
					type: 'image/jpeg'
				}
			]
		],
	];

	it.each( dataSet )( 'returns correct data for given property value', ( propertyValue, type, image_urls ) => {
		const lcpDetector = new SmushLCPDetector();
		lcpDetector.shouldUseRelativeImageURL = ! propertyValue.includes( 'http://localhost' );
		const backgroundDataForElement = lcpDetector.getBackgroundDataForPropertyValue( propertyValue );

		expect( backgroundDataForElement ).toStrictEqual( {
			type,
			image_urls,
		} );
	} );
} );

describe( 'shouldUseRelativeImageURL', () => {
	const dataSet = [
		[
			// Case: Element contains absolute URL in src attribute
			'<img src="http://localhost/wp-content/uploads/2024/08/image1.jpeg">',
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			false,
		],
		[
			// Case: Element contains relative URL in src attribute
			'<img src="/wp-content/uploads/2024/08/image1.jpeg">',
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			true,
		],
		[
			// Case: Element does not contain the URL
			'<img src="/wp-content/uploads/2024/08/other-image.jpeg">',
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			false,
		],
		[
			// Case: Element contains absolute URL in background style
			'<div style="background-image: url(http://localhost/wp-content/uploads/2024/08/image1.jpeg);"></div>',
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			false,
		],
		[
			// Case: Element contains relative URL in background style
			'<div style="background-image: url(/wp-content/uploads/2024/08/image1.jpeg);"></div>',
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			true,
		],
		[
			// Case: Element is null
			null,
			'http://localhost/wp-content/uploads/2024/08/image1.jpeg',
			false,
		],
	];

	it.each( dataSet )(
		'returns %s when element is %s and absoluteImageUrl is %s',
		( elementHTML, absoluteImageUrl, expected ) => {
			const lcpDetector = new SmushLCPDetector();
			const element = elementHTML
				? document.createElement( 'div' )
				: null;

			if ( element ) {
				element.innerHTML = elementHTML;
			}

			const result = lcpDetector.shouldUseRelativeImageURL(
				element?.firstChild || element,
				absoluteImageUrl
			);

			expect( result ).toBe( expected );
		}
	);
} );