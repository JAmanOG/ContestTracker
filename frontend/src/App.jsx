import { useState } from "react";
import Layout from "./layout/layout";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Layout />
      <Analytics />
    </>
  );
}

export default App;
