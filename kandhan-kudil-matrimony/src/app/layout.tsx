import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kandhan Kudil Matrimony | Where Hearts Meet, Families Connect",
  description:
    "A trusted matrimonial platform for meaningful connections and families in Salem and beyond.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
