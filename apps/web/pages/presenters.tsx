import { FC, useMemo } from "react";
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
    <div className="flex md:flex-col md:max-w-xs overflow-hidden bg-white rounded-lg shadow-md md:shadow-lg dark:bg-gray-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="object-cover md:w-full h-28 md:h-56"
        src={presenter.UserUploads?.[0]?.url}
        alt="avatar"
      />

      <div className="md:text-center py-5 px-4 md:px0">
        <a
          href="#"
          className="block text-lg md:text-2xl font-bold text-gray-800 dark:text-white"
        >
          {[presenter.firstname, presenter.lastname].filter(Boolean).join(" ")}
        </a>

        <a
          href={`mailto:${presenter.email}`}
          className="text-sm text-gray-700 dark:text-gray-200"
        >
          {presenter.email}
        </a>
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

  const colsClassName = useMemo(() => {
    switch (data?.User.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
    }
  }, [data?.User.length]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <Layout>
      <div className="flex flex-1 flex-col">
        <main className="flex md:flex-1 justify-center md:items-center py-8 md:py-20">
          <div
            className={`flex-1 md:flex-none px-4 md:px-0 grid ${colsClassName} gap-y-12 md:gap-24 lg:gap-48`}
          >
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
