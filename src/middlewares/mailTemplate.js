export const html = (token, id) => {
  return `<h1>Password Reset</h1>
<p>
You're receiving this e-mail because you requested a password reset for your user account on Crispy Munch.</p>
<br>
<p>
If you didn't request this changes, you can disregard this email - we have not yet reset your password</p>
<br>

<a href="https://crispy-munch-v2.herokuapp.com/change-password?token=${token}&id=${id}"}>
<button style='color: red; padding: 10px'>Change my password</button>
</a>
`;
};
