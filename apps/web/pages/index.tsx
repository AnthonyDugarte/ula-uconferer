import { withApollo } from "../lib/withApollo";
import { Layout } from "../components/layout";

function Home() {
  return (
    <Layout>
      <section className="flex-1 flex justify-center items-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
          Uconferer
        </h1>
      </section>
    </Layout>
  );
}

export default withApollo({ auth: false })(Home);
