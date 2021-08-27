import React, { Fragment, useState } from "react";
import { withApollo } from "../lib/withApollo";
import { useUser } from "@auth0/nextjs-auth0";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

/**
 * Some mock data to test the User cards.
 */
const people = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]

/**Client to perform request against local api */
const client = new ApolloClient({
    uri: 'http://localhost:8081/v1/graphql',
    cache: new InMemoryCache()
});

/**Presenters request */
const GET_PRESENTERS=gql`
    query getPresenter {
        User(where: {Role: {name: {_eq: "Presenter"}}}) {
        firstname
        lastname
        email
        }
    }
`
const get_presenters_f = () =>  client.query({query: GET_PRESENTERS}).then(result => {
    console.log(result)
    return result.data.User
})

/**
 * Presentation Card for an User. 
 * 
 * The card template was taken from -> https://merakiui.com
 * From Cards -> User
 * @param presenter 
 * @returns The User component with the User data loaded.
 */
function PresenterCard({ presenter }) {
    return (
        <div class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img class="object-cover w-full h-56" src={people[0].image} alt="avatar" />
            
            <div class="py-5 text-center">
                <a href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">{presenter.name}</a>
                <span class="text-sm text-gray-700 dark:text-gray-200">{presenter.email}</span>
            </div>
        </div>
    )
}

function Presenters(){
    const { user } = useUser();
    
    /**Calling presenters. Console should eventually show Presenters response */
    let presenters = get_presenters_f()

    return (
        <div className="container mx-auto flex flex-1 flex-col">
            <main className="flex flex-1 justify-center items-center py-20">
                <div class="h-64 grid grid-rows-1 grid-flow-col gap-64 gap-y-96">
                    <div><PresenterCard presenter={people[0]} /></div>
                    <div><PresenterCard presenter={people[1]} /></div>
                    <div><PresenterCard presenter={people[2]} /></div>
                </div>
            </main>
        </div>
    ) 
}

export default withApollo()(Presenters)