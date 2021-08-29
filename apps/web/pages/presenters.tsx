import React, { Fragment, useState } from "react";
import { withApollo } from "../lib/withApollo";
import { useUser } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";


/**Presenters request */
const GET_PRESENTERS=gql`
    query getPresenter {
        User(where: {Role: {name: {_eq: "Presenter"}}}) {
        firstname
        lastname
        email
        UserUploads {
            url
        }
        }
    }
`

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
function PresenterCard(presenter) {
    return (
        <div class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img class="object-cover w-full h-56" src={presenter.UserUploads[0].url} alt="avatar" />
            
            <div class="py-5 text-center">
                <a href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">{presenter.name}</a>
                <span class="text-sm text-gray-700 dark:text-gray-200">{presenter.email}</span>
            </div>
        </div>
    )   
}

/**
 * Functional component to get the Presenters from the API.
 * 
 * https://www.apollographql.com/docs/react/data/queries/#executing-a-query
 * 
 * @returns PresenterCard's for each presenter returned by the GET_PRESETERS query.
 */
function Presenters() {
    const { loading, error, data } = useQuery(GET_PRESENTERS);

    if (loading) {
        console.log("Loading...");
        return 'Loading...';
    }
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container mx-auto flex flex-1 flex-col">
            <main className="flex flex-1 justify-center items-center py-20">
                <div class="h-80 grid grid-rows-1 grid-flow-col gap-64 gap-y-96">
                    { data.User.map(presenter => PresenterCard(presenter)) }
                </div>
            </main>
        </div>
    )
}


export default withApollo()(Presenters)
