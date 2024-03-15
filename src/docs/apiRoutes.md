## Routes - API documentation

This documentation provides all necessary information about the vero-backend API routes.

------------------------------------------------------------------------------------------

#### Everything related to users

Prefix `/users`

<details>
<summary><code>POST</code> <code><b>/register</b></code> <code>(register a new user)</code></summary>

##### Parameters

- None

##### Body

| name      | data type | requeired | description |
|-----------|-----------|-----------|-------------|
| firstName | string    | true      | N/A         |
| lastName  | string    | true      | N/A         |
| email     | string    | true      | N/A         |
| password  | string    | true      | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `201`     | User                                             |
| `200`     | Validation failed - provide correct data in body |
| `401`     | AccessToken not found                            |
| `401`     | User not found                                   |
| `409`     | Email already in use                             |

</details>

<details>
<summary><code>POST</code> <code><b>/login</b></code> <code>(log in a user)</code></summary>

##### Parameters

- None

##### Body

| name     | data type | requeired | description |
|----------|-----------|-----------|-------------|
| email    | string    | true      | N/A         |
| password | string    | true      | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `200`     | AccessToken                                      |
| `400`     | Validation failed - provide correct data in body |
| `400`     | Invalid email or password                        |

</details>

------------------------------------------------------------------------------------------

#### Everything related to clubs

Prefix `/clubs`

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(returns a list of club the user is part of)</code></summary>

##### Parameters

- None

#### Body

- None

##### Responses

| http code | response                      |
|-----------|-------------------------------|
| `200`     | Clubs                         |
| `400`     | AccessToken not found         |
| `400`     | User not found                |
| `401`     | Invalid token - Token expired |

</details>

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(creates a new club with first member)</code></summary>

##### Parameters

> None

##### Body

| name | data type | requeired | description |
|------|-----------|-----------|-------------|
| name | string    | true      | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `200`     | Club and Member                                  |
| `400`     | Validation failed - provide correct data in body |
| `400`     | AccessToken not found                            |
| `401`     | Invalid token - Token expired                    |
| `401`     | Unauthorized                                     |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/:clubId</b></code> <code>(deletes a club with all references)</code></summary>

##### Parameters

| name   | description |
|--------|-------------|
| userId | N/A         |

##### Body

- None

##### Responses

| http code | response                                   |
|-----------|--------------------------------------------|
| `200`     | Club and Member                            |
| `400`     | Validation failed - provide correct params |
| `400`     | AccessToken not found                      |
| `401`     | Invalid token - Token expired              |
| `401`     | Unauthorized                               |

</details>

------------------------------------------------------------------------------------------

#### Everything related to members

Prefix `/clubs/:clubId/members`

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(returns all members)</code></summary>

##### Parameters

| name   | description |
|--------|-------------|
| userId | N/A         |

#### Body

- None

##### Responses

| http code | response                                   |
|-----------|--------------------------------------------|
| `200`     | Members                                    |
| `400`     | Validation failed - provide correct params |
| `400`     | AccessToken not found                      |
| `401`     | Invalid token - Token expired              |
| `401`     | Unauthorized                               |

</details>

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(creates a new member)</code></summary>

##### Parameters

| name   | description |
|--------|-------------|
| userId | N/A         |

#### Body

| name      | data type | requeired | description |
|-----------|-----------|-----------|-------------|
| firstName | string    | true      | N/A         |
| lastName  | string    | true      | N/A         |
| email     | string    | false     | N/A         |
| isAdmin   | boolean   | false     | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `200`     | Member                                           |
| `400`     | Validation failed - provide correct params       |
| `400`     | Validation failed - provide correct data in body |
| `400`     | AccessToken not found                            |
| `401`     | Invalid token - Token expired                    |
| `401`     | Unauthorized                                     |

</details>

<details>
 <summary><code>PATCH</code> <code><b>/:memberId</b></code> <code>(updates a member)</code></summary>

##### Parameters

| name     | description |
|----------|-------------|
| userId   | N/A         |
| memberId | N/A         |

#### Body

| name      | data type | requeired | description |
|-----------|-----------|-----------|-------------|
| firstName | string    | false     | N/A         |
| lastName  | string    | false     | N/A         |
| email     | string    | false     | N/A         |
| isAdmin   | boolean   | false     | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `204`     | N/A                                              |
| `400`     | Member not part of club                          |
| `400`     | Validation failed - provide correct params       |
| `400`     | Validation failed - provide correct data in body |
| `400`     | AccessToken not found                            |
| `401`     | Invalid token - Token expired                    |
| `401`     | Unauthorized                                     |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/:memberId</b></code> <code>(deletes a member)</code></summary>

##### Parameters

| name     | description |
|----------|-------------|
| userId   | N/A         |
| memberId | N/A         |

#### Body

| name      | data type | requeired | description |
|-----------|-----------|-----------|-------------|
| firstName | string    | false     | N/A         |
| lastName  | string    | false     | N/A         |
| email     | string    | false     | N/A         |
| isAdmin   | boolean   | false     | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `204`     | N/A                                              |
| `400`     | Member not part of club                          |
| `400`     | Validation failed - provide correct params       |
| `400`     | Validation failed - provide correct data in body |
| `400`     | AccessToken not found                            |
| `401`     | Invalid token - Token expired                    |
| `401`     | Unauthorized                                     |

</details>

------------------------------------------------------------------------------------------

#### Everything related to teams

Prefix `/clubs/:clubId/teams`

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(creates a new team)</code></summary>

##### Parameters

| name   | description |
|--------|-------------|
| userId | N/A         |

#### Body

| name | data type | requeired | description |
|------|-----------|-----------|-------------|
| name | string    | true      | N/A         |

##### Responses

| http code | response                                         |
|-----------|--------------------------------------------------|
| `200`     | Team                                             |
| `400`     | Validation failed - provide correct params       |
| `400`     | Validation failed - provide correct data in body |
| `400`     | AccessToken not found                            |
| `401`     | Invalid token - Token expired                    |
| `401`     | Unauthorized                                     |

</details>

<details>
 <summary><code>POST</code> <code><b>/:teamId/members/:memberId</b></code> <code>(adds a member to team)</code></summary>

##### Parameters

| name     | description |
|----------|-------------|
| userId   | N/A         |
| teamId   | N/A         |
| memberId | N/A         |

#### Body

- None

##### Responses

| http code | response                                   |
|-----------|--------------------------------------------|
| `201`     | N/A                                        |
| `400`     | Member or team are not part of club        |
| `400`     | Member is already in team                  |
| `400`     | Validation failed - provide correct params |
| `400`     | AccessToken not found                      |
| `401`     | Invalid token - Token expired              |
| `401`     | Unauthorized                               |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/:teamId/members/:memberId</b></code> <code>(deletes a member from a team)</code></summary>

##### Parameters

| name     | description |
|----------|-------------|
| userId   | N/A         |
| teamId   | N/A         |
| memberId | N/A         |

#### Body

- None

##### Responses

| http code | response                                   |
|-----------|--------------------------------------------|
| `204`     | N/A                                        |
| `400`     | Member or Team are not part of club        |
| `400`     | Validation failed - provide correct params |
| `400`     | AccessToken not found                      |
| `401`     | Invalid token - Token expired              |
| `401`     | Unauthorized                               |

</details>