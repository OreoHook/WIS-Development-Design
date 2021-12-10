import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function Meta({
  title,
  keywords,
  description,
  image,
}: MetaProps) {
  title = title.includes("Система")
    ? title
    : title.concat(" | Система учета преподавателей");
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image ? image : "/icon.jpg"} />
      <title>{title}</title>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#030303" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />
    </Head>
  );
}

Meta.defaultProps = {
  title: "Главная | Система учета преподавателей",
  keywords:
    "development, programming, design, frontend, backend, computer science, management",
  description: "Система учета преподавателей",
};
