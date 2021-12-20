import type { PropsWithChildren } from "react";
import Meta from "components/layout/meta";

interface PageLayoutProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function PageLayout({
  children,
  title,
  description,
  keywords,
  image,
}: PropsWithChildren<PageLayoutProps>) {
  return (
    <>
      {/* Мета тэги */}
      <Meta
        title={title}
        description={description}
        keywords={keywords}
        image={image}
      />
      <main>{children}</main>
    </>
  );
}
