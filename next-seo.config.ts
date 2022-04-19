const SEO = {
    title: "Tweeter",
    description: "Tweeter is a social network based in twitter.",
    canonical: process.env.baseURL || "http://localhost:3000/",
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: process.env.baseURL || "http://localhost:3000/",
        site_name: "Tweeter",
    },
};

export default SEO;
