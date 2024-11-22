
import DefaultLayout from "./DefaultLayout"

const HomeIndex = () => {
   return (
    <>
        <h1>Welcome</h1>
        </>
    )
}
HomeIndex.layout = (page: any) => <DefaultLayout children={page} />
export default HomeIndex

{/* <p style={{ color: 'green' }}>{notice}</p> */}

{/* <p>Signed as <%= Current.user.email %></p>

<h2>Login and verification</h2>

<div>
  <%= link_to "Change password", edit_password_path %>
</div>

<div>
  <%= link_to "Change email address", edit_identity_email_path %>
</div>

<h2>Access history</h2>

<div>
  <%= link_to "Devices & Sessions", sessions_path %>
</div>

<br>

<%= button_to "Log out", Current.session, method: :delete %></br> */}