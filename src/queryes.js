// это ДЛЯ ВЫВОДА МОИХ репозиториев с пагинацией при первой загрузке приложения
// {
//   viewer {
//     login
//     repositories(after: null, before: null, first: 10) {
//       pageInfo {
//         endCursor
//         hasNextPage
//         hasPreviousPage
//         startCursor
//       }
//       edges {
//         node {
//           id
//           name
//           stargazerCount
//           url
//           updatedAt
// owner {
//   login
// }
//         }
//       }
//     }
//   }
// }

// это при поиске ВСЕХ СОВПАДАЮЩИХ УСЛОВИЮ ПОИСКА репозитория и вывода всех результатов ниже с пагинацией
// {
//   search(
//     query: "car"
//     type: REPOSITORY
//     first: 10
//     after: "Y3Vyc29yOjIw"
//     before: null
//   ) {
//     edges {
//       node {
//         ... on Repository {
//           id
//           name
//           updatedAt
//           stargazerCount
//           url
// owner {
//   login
// }
//         }
//       }
//     }
//     pageInfo {
//       hasNextPage
//       endCursor
//       startCursor
//       hasPreviousPage
//     }
//   }
// }

// Это для поиска ОДНОГО КОНКРЕТНОГО репозитория
// переменные задавать динамически
// {
//   repository(name: "chat-firebase", owner: "artem4rolov") {
//     id
//     name
//     stargazerCount
//     owner {
//       avatarUrl
//       login
//       url
//     }
//     languages(first: 20) {
//       edges {
//         node {
//           name
//         }
//       }
//     }
//     description
//     updatedAt
//   }
// }
