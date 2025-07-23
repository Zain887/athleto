// app/about/page.tsx
import Layout from "../components/Layout";
import Head from "next/head";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About ATHLETO - Our Story & Vision</title>
        <meta name="description" content="Learn about ATHLETO’s mission to create premium tracksuits that blend fashion, comfort, and performance." />
      </Head>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">About ATHLETO</h1>
      <p className="text-gray-700 mb-6">
        ATHLETO is built to inspire comfort and confidence through modern athletic wear. We specialize in
        tracksuits for men, women, and kids that blend style and function.
      </p>
      {/* Team section or images can go here */}
    </Layout>
  );
}