import { routing } from '@/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateMetadata() {
  // get current port
  const port = process.env.PORT || 8787;
  return {
    title: 'Locale Layout',
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`
    ),
    alternates: {
      canonical: './',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
