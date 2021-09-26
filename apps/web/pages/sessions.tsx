import { withApollo } from "../lib/withApollo";
import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import { Layout } from "../components/layout";

interface Session {
  session_id: string;
  summarization: string;
  name: string;
  start_at: string;
  end_at: string;
  SessionUploads: {
    url: string;
  }[];
  User: {
    firstname: string;
    lastname: string;
    UserUploads: {
      url: string;
    }[];
  };
}

interface SessionResult {
  Session: Session[];
}

/**Get Sessions Query with the presenter */
const GET_SESSIONS = gql`
  query getSessions {
    Session(order_by: [{ start_at: asc }]) {
      session_id
      summarization
      name
      start_at
      end_at
      SessionUploads {
        url
      }
      User {
        firstname
        lastname
        UserUploads {
          url
        }
      }
    }
  }
`;

/**
 * Component for a Session in a Session List.
 *
 * The code was taken from here: https://tailwindui.com/documentation#react-creating-components
 * @param session
 * @returns The rendered component
 */
function SessionEntry({ session }: { session: Session }) {
  return (
    <li key={session.name} className="py-4 flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-10 w-10 rounded-full"
        src={session.User.UserUploads[0].url}
        alt=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-10 w-10 rounded-full"
        src={session.SessionUploads[0].url}
        alt=""
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{session.name}</p>
        <p className="text-sm font-medium text-gray-900">
          {session.User.firstname + " " + session.User.lastname}
        </p>
        <p className="text-sm text-gray-500">{session.summarization}</p>
      </div>
    </li>
  );
}

const SessionsList: FC = () => {
  const { loading, error, data } = useQuery<SessionResult>(GET_SESSIONS);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <Layout>
      <ul className="divide-y divide-gray-200">
        {data?.Session.map((session) => (
          <SessionEntry key={session.session_id} session={session} />
        ))}
      </ul>
    </Layout>
  );
};

export default withApollo()(SessionsList);
