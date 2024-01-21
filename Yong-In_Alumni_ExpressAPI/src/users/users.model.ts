export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  membership_status: string;
  membership_expiration: Date | null;
  created_at: Date;
  updated_at: Date;
  role: number;
}


// const users = [
//   {
//     id: 'e877be66-aa22-4c91-b3e4-b5d304ea09c7',
//     firstName: 'Jess',
//     lastName: 'Larson',
//     email: 'jjk14150@gmail.com',
//     userName: 'MyUsername',
//     password: '$2b$10$ZUhVyIOLa.HRoJ4G5/v.JuQEZXhNY/BLkvCAN3FT2KhvGuSOOpFaq', // password
//     membership_status: 'provisional',
//     membership_expiration: null,
//     created_at: '2024-01-08T06:47:56.921Z',
//     updated_at: '2024-01-08T06:47:56.921Z',
//     role: 1
//   },
//   {
//     id: '1b4892c2-07e1-46f6-a3dc-08fc61267592',
//     firstName: 'Jack',
//     lastName: 'Dude',
//     email: 'jack@gmail.com',
//     userName: 'jackDude',
//     password: '$2b$10$Mgj3KZf67b90dtTZnzGxmOo4qEb/UtghakjnxL57w4sPhK8a1Prvm', //password4
//     membership_status: 'provisional',
//     membership_expiration: null,
//     created_at: '2024-01-08T05:40:32.119Z',
//     updated_at: '2024-01-08T05:40:32.119Z',
//     role: 2
//   },
//   {
//     id: 'd174e808-ff2b-493f-bd79-2cf7db175e53',
//     firstName: 'Person',
//     lastName: 'Dude',
//     email: 'asdf@gmail.com',
//     userName: 'userName',
//     password: '$2b$10$iSDDVudC.Oe7yyFFZUzPoeYSXdCe3wgwxZZ7HwbzhmRNeBuebTQMe', //password
//     membership_status: 'provisional',
//     membership_expiration: null,
//     created_at: '2024-01-08T05:43:06.829Z',
//     updated_at: '2024-01-08T05:43:06.829Z',
//     role: 2
//   },
//   {
//     id: '7cefc35b-dd00-4c9f-8d5d-cbd0300f89b9',
//     firstName: 'Person',
//     lastName: 'user',
//     email: 'asdf@gmail.com',
//     userName: 'userPerson',
//     password: '$2b$10$Ji9.WBIjB31FLwCnBQZY.eszVkmngUcPBTRSq/U99RYU0WeFww/.K',
//     membership_status: 'provisional',
//     membership_expiration: null,
//     created_at: '2024-01-08T05:44:15.880Z',
//     updated_at: '2024-01-08T05:44:15.880Z',
//     role: 2
//   }
// ];

// module.exports = users;
