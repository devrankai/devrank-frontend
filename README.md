# DevRank

## <img width="26" height="26" src="https://img.icons8.com/color/26/figma--v1.png" alt="figma"/> Figma

[Link to Figma design](https://www.figma.com/file/NioMXwhZhfIjnlPOO395S1/DevRank-1.1?type=design&node-id=0-1&mode=design&t=OwT9zvKAyeN764LH-0)

---

## <img width="26" height="26" src="https://img.icons8.com/office/26/console.png" alt="console"/> Commands

- To install the **node-modules**:

```BASH
npm install
```

- To run the project locally:

```BASH
npm run dev
```

And open the browser at: `http://localhost:5173/`

---

## <img width="26" height="26" src="https://img.icons8.com/fluency/26/route.png" alt="route"/> Routes

### Public routes

| Route                            | Page           | MainComponent         |
| -------------------------------- | -------------- | --------------------- |
| `/`                              | LogIn          | LogInSection          |
| `/sign-up`                       | SigUp          | SignUpSection         |
| `/sign-up/verification-code`     | SigUpCode      | SignUpCodeSection     |
| `/sign-up/verification-password` | SignUpPassword | SignUpPasswordSection |
| `/reset-password`                | ResetPassword  | ResetPasswordSection  |

### Private routes

| Route                            | Page            | MainComponent          |
| -------------------------------- | --------------- | ---------------------- |
| `/dashboard/client`              | Client          | ClientSection          |
| `/dashboard/client/create`       | ClientCreate    | ClientCreateSection    |
| `/dashboard/client/edit/${id}`   | ClientEdit      | ClientEditSection      |
| `/dashboard/project`             | Project         | ProjectSection         |
| `/dashboard/project/create`      | ProjectCreate   | ProjectCreateSection   |
| `/dashboard/project/edit/${id}`  | ProjectEdit     | ProjectEditSection     |
| `/dashboard/position`            | Position        | PositionSection        |
| `/dashboard/job-info`            | JobInfo         | JobInfoSection         |
| `/dashboard/job-info/edit/${id}` | JobInfoEdit     | JobInfoEditSection     |
| `/dashboard/search-results`      | SearchResults   | SearchResultsSection   |
| `/dashboard/candidate-review`    | CandidateReview | CandidateReviewSection |

---

## <img width="26" height="26" src="https://img.icons8.com/color/26/folder-invoices--v1.png" alt="folder-invoices--v1"/> Project structure

```
> node_modules
> public
  > assets
> src
 > assets
 > components
  > forms
  > sections
  > tables
  > ui
 > constants
 > context
 > hooks
 > layouts
 > models
 > pages
  > private-pages
  > public-pages
 > routes
  > guard
  > private-routes
  > public-routes
 > schemas
 > services
 > store
 > theme
 > utils
```

---

## <img width="24" height="24" src="https://img.icons8.com/papercut/24/file.png" alt="file"/> .env

Make a copy of the `.env.template` file and rename to `.env`.

---

## <img width="26" height="26" src="https://img.icons8.com/color/26/api.png" alt="api"/> API

[Swagger](http://20.231.99.194:5000/swagger/)

---
