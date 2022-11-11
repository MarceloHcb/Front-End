import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';

const getUsers = async() => { 
   return fetch(USERS_API).then((response) => response.json())
   .then((data) => data.users);
  }
const users = await getUsers()
fillUsersSelect(users)

usersSelect.addEventListener('change', () => {
  clearPageData();
  users.map( ({ id }) => {
    fetch(`https://dummyjson.com/posts/user/${id}`)
    .then(response =>  response.json())
    .then(data =>  {
     fillPosts(data.posts);
     return data
    }).then(data => console.log(data))
  });

  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.
});
