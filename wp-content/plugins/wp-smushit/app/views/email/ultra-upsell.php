<?php
/**
 * Background optimization email Ultra 5X upsell template for free users.
 *
 * @package Smush\App
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="smush-email-ultra-upsell-wrap" style="margin:25px auto 0;padding:0;max-width:550px;">
	<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:550px;background-color:#F2F2FF;border-radius:10px;" width="550"><tr><td style="padding:18px 15px;"><![endif]-->
	<table id="smush-email-ultra-upsell" class="smush-email-ultra-upsell" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin:0 auto;max-width:550px;background:#F2F2FF;background-color:#F2F2FF;border-radius:10px;border-collapse:separate;padding:0;border-spacing:0;">
		<tbody>
			<tr>
				<td class="smush-ultra-upsell-body" style="padding:10px 15px 15px;vertical-align:middle;">
					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse:collapse;border-spacing:0;margin:0;padding:0;">
						<tbody>
							<tr>
								<!-- Left: Smush Pro Icon Circle -->
								<td class="smush-ultra-upsell-icon-col" style="width:70px;min-width:70px;max-width:70px;vertical-align:middle;padding:7px 0 0 0;" valign="middle">
									<div class="smush-ultra-icon-circle" style="display:block;width:70px;height:70px;min-width:70px;min-height:70px;border-radius:50%;background-color:#571EE7;text-align:center;line-height:70px;margin:0 auto;">
										<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="70" height="70" style="border-collapse:collapse;border-spacing:0;width:70px;height:70px;margin:0 auto;">
											<tbody>
												<tr>
													<td align="center" valign="middle" style="width:70px;height:70px;line-height:1;text-align:center;vertical-align:middle;">
														<img class="smush-ultra-icon-img" src="<?php echo WP_SMUSH_URL . 'app/assets/images/email/smush.png'; ?>" alt="" width="35" height="35" style="display:block;width:35px;height:35px;border:0;outline:none;text-decoration:none;margin:0 auto;" />
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</td>

								<!-- Center: Unlimited sites badge + Ultra 5X copy -->
								<td class="smush-ultra-upsell-content-col" style="vertical-align:middle;text-align:left;padding:0 10px 0 15px;" valign="middle">
									<!-- Main Copy -->
									<p class="smush-ultra-upsell-text" style="box-sizing: border-box;font-family:Roboto, Arial, sans-serif;font-size:16px;line-height:24px;letter-spacing:-0.25px;margin:0;padding:0;text-align:left;">
										<span class="smush-ultra-upsell-dark-text" style="font-weight:400;color:#1A1A1A;"><?php esc_html_e( 'Upgrade to Pro.', 'wp-smushit' ); ?></span>
										<span class="smush-ultra-upsell-purple-text" style="font-weight:400;color:#571EE7;">
											<?php esc_html_e( 'Save up to 60% more with Ultra 5X compression.', 'wp-smushit' ); ?>
										</span>
									</p>
								</td>

								<!-- Right: Upgrade Pro CTA button -->
								<td class="smush-ultra-upsell-cta-col" style="width:115px;min-width:115px;max-width:115px;vertical-align:middle;text-align:right;padding:0;" valign="middle" align="right">
									<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;border-spacing:0;margin-left:auto;margin-top:7px;">
										<tbody>
											<tr>
												<td class="smush-ultra-upsell-btn-cell" style="background:#571EE7;background-color:#571EE7;border-radius:10px;height:30px;line-height:1;padding:0 15px;text-align:center;vertical-align:middle;">
													<a class="smush-ultra-upsell-btn" href="<?php echo esc_url( $upsell_url ); ?>" target="_blank" style="text-decoration:none!important;display:inline-block;color:#FFFFFF!important;font-family:Roboto, Arial, sans-serif;font-size:12px;letter-spacing: 0.1px;font-weight:700;line-height:20px;white-space:nowrap;">
														<span style="color:#FFFFFF;vertical-align:middle;"><?php esc_html_e( 'Upgrade', 'wp-smushit' ); ?></span>
														<span class="smush-ultra-upsell-pro-pill" style="box-sizing: border-box;display:inline-block;width:30px;height:18px;line-height:17px;border:1px solid #FFFFFF!important;border-radius:1020px;padding:0 5px;font-size:12px;font-weight:400;color:#FFFFFF;margin-left:4px;vertical-align:middle;box-sizing:border-box;text-align:center;">
															<?php esc_html_e( 'Pro', 'wp-smushit' ); ?>
														</span>
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
	<!--[if mso | IE]></td></tr></table><![endif]-->
</div>
