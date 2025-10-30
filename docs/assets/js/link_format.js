// /から始まるリンクを絶対パスに、http(https)から始まるリンクを別タブで開くように設定するためのファイルです。
// 本当はデプロイ時に操作出来たらよいのですが、github page そのままでは難しいためこのような実装としています。
document.addEventListener("DOMContentLoaded", () => {
    // Jekyllのsite.urlをJS変数に埋め込む
    //const siteUrl = "{{ site.url }}".replace(/\/$/, ""); // 末尾の / を削除
    const siteUrl = (window.SITE_URL || "").replace(/\/$/, "");

    document.querySelectorAll("a[href]").forEach(a => {
        const href = a.getAttribute("href");

        // 1. ルート(/)から始まる相対リンクなら、site.urlを前につける
        if (href.startsWith("/") && !href.startsWith("//")) {
            a.href = siteUrl + href;
        }

        // 2. http または https で始まり、同一ドメインでない場合 → 外部リンク扱い
        else if (/^https?:\/\//i.test(href) && !href.includes(location.hostname)) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
        }
    });
});