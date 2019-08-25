<table>
<thead>
  <tr>
    <th></th>
    <th>Nome</th>
    <th></th>
  </tr>
</thead>
<tbody>
  {users.map(user => (
    <tr key={user._id}>
      <td></td>
      <td>{user.name}</td>
    </tr>
  )

  )}
</tbody>
</table>
<table>
<thead>
  <tr>
    <th></th>
    <th>Cidade</th>
    <th></th>
  </tr>
</thead>
<tbody>
  {cidades.map(cidade => (
    <tr key={cidade._id}>

      <td>{cidade.name}</td>

    </tr>
  )

  )}
</tbody>
</table>