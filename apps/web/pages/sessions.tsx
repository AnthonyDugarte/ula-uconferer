import React, { Fragment, useState } from "react";
import { withApollo } from "../lib/withApollo";
import { useUser } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";

/**Get Sessions Query with the presenter */
const GET_SESSIONS = gql`
  query getSessions {
    Session {
      summarization
      name
      date
      time
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
function SessionEntry(session) {
  return (
    <li key={session.name} className="py-4 flex">
      <img
        className="h-10 w-10 rounded-full"
        src={session.User.UserUploads[0].url}
        alt=""
      />
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
        <p className="text-sm text-gray-500">
          {session.summarization.join(" ")}
        </p>
      </div>
    </li>
  );
}

function SessionsList() {
  const { loading, error, data } = useQuery(GET_SESSIONS);

  if (loading) {
    console.log("Loading...");
    return "Loading...";
  }
  if (error) return `Error! ${error.message}`;

  return (
    <ul className="divide-y divide-gray-200">
      {data.Session.map((session) => SessionEntry(session))}
    </ul>
  );
}

export default withApollo()(SessionsList);
