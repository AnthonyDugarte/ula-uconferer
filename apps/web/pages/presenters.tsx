import { FC } from "react";
import { withApollo } from "../lib/withApollo";
import { gql, useQuery } from "@apollo/client";
import { Layout } from "../components/layout";

interface Presenter {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  UserUploads?: {
    url: string;
  }[];
}

interface PresenterResult {
  User: Presenter[];
}

/**Presenters request */
const GET_PRESENTERS = gql`
  query getPresenter {
    User(where: { Role: { name: { _eq: "Presenter" } } }) {
      user_id
      firstname
      lastname
      email
      UserUploads {
        url
      }
    }
  }
`;

/**
 * Presentation Card for an User.
 *
 * The card template was taken from -> https://merakiui.com
 * From Cards -> User
 *
 *
 * Note: An user has an array of UserUploads. Image is being taken from the firts and only
 *  populated possition in the test data.
 *
 * @param presenter
 * @returns The User component with the User data loaded.
 */
function PresenterCard({ presenter }: { presenter: Presenter }) {
  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="object-cover w-full h-56"
        src={presenter.UserUploads?.[0]?.url}
        alt="avatar"
      />

      <div className="py-5 text-center">
        <a
          href="#"
          className="block text-2xl font-bold text-gray-800 dark:text-white"
        >
          {[presenter.firstname, presenter.lastname].filter(Boolean).join(" ")}
        </a>

        <span className="text-sm text-gray-700 dark:text-gray-200">
          {presenter.email}
        </span>
      </div>
    </div>
  );
}

/**
 * Functional component to get the Presenters from the API.
 *
 * https://www.apollographql.com/docs/react/data/queries/#executing-a-query
 *
 * @returns PresenterCard's for each presenter returned by the GET_PRESETERS query.
 */
const PresentersPage: FC = () => {
  const { loading, error, data } = useQuery<PresenterResult>(GET_PRESENTERS);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <Layout>
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 justify-center items-center py-20">
          <div className="grid grid-rows-1 grid-flow-col gap-64 gap-y-96">
            {data?.User.map((presenter) => (
              <PresenterCard key={presenter.user_id} presenter={presenter} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default withApollo()(PresentersPage);
