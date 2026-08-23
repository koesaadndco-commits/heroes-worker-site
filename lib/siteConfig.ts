// 会社情報を「コード内の既定値」と「管理コンソールでの上書き」を合成して返す。
// 上書きが無い項目は既定値（lib/site.ts）を使う。KV 未設定時はすべて既定値。
import { site } from "./site";
import { getOverridesCached, getOverrides, type SiteOverrides } from "./store";

export type SiteInfo = {
  hours: string;
  tel: string;
  telHref: string;
  email: string;
  zip: string;
  addressLine: string;
};

function telHrefFrom(tel: string): string {
  return `tel:${tel.replace(/[^0-9]/g, "")}`;
}

export function resolveSiteInfo(o: SiteOverrides | null): SiteInfo {
  const tel = o?.tel?.trim() || site.contact.tel;
  return {
    hours: o?.hours?.trim() || site.contact.hours,
    tel,
    telHref: o?.tel?.trim() ? telHrefFrom(o.tel.trim()) : site.contact.telHref,
    email: o?.email?.trim() || site.contact.email,
    zip: o?.zip?.trim() || site.address.zip,
    addressLine: o?.addressLine?.trim() || site.address.line,
  };
}

/** 公開ページ用（ISR キャッシュ）。 */
export async function getSiteInfo(): Promise<SiteInfo> {
  return resolveSiteInfo(await getOverridesCached());
}

/** 管理画面用（最新）。 */
export async function getSiteInfoFresh(): Promise<SiteInfo> {
  return resolveSiteInfo(await getOverrides());
}
