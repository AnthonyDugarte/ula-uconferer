import { withApollo } from "../../lib/withApollo";
import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Layout } from "../../components/layout";

interface Session {
  session_id: string;
  summarization: string;
  name: string;
  start_at?: string;
  end_at?: string;
  SessionUploads: {
    url: string;
  }[];
  User: {
    user_id: string;
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
        user_id
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
    <li key={session.session_id}>
      <Link href={`/sessions/${session.session_id}`}>
        <a className="py-4 px-2 flex group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-24 w-24 rounded-full transition-opacity group-hover:opacity-75 mr-3"
            src={session.SessionUploads[0].url}
            alt=""
          />

          <div className="flex-1">
            <p className="text-lg md:text-2xl font-medium text-gray-900 mb-2">
              {session.name}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-12 w-12 rounded-full transition-opacity group-hover:opacity-75 mr-3"
                  src={session.User.UserUploads[0].url}
                  alt=""
                />

                <div>
                  <p className="text-base font-medium text-gray-900">
                    {[session.User.firstname, session.User.lastname]
                      .filter(Boolean)
                      .join(" ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.summarization}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                {session.start_at && (
                  <span className="text-sm text-gray-900">
                    {format(new Date(session.start_at), "MMM do, hh:mm bbb")}
                  </span>
                )}

                {session.start_at && session.end_at && " - "}

                {session.end_at && (
                  <span className="text-sm text-gray-900">
                    {format(new Date(session.end_at), "hh:mm bbb")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
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
