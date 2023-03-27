import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return <Wrapper>
    <h2 className="common-heading">Contact Page</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0741470691655!2d77.27630046508247!3d28.627539765154452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce35319b6a7ff%3A0x127dca80423ad527!2sLaxmi%20Nagar%2C%20Block%20S1%2C%20Nanakpura%2C%20Shakarpur%2C%20New%20Delhi%2C%20Delhi%20110092!5e0!3m2!1sen!2sin!4v1672660933686!5m2!1sen!2sin" 
    width="100%`" 
    height="450"
     style={{border:"0"}} 
     allowFullScreen="" 
     loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
     
     <div className="container">
      <div className="contact-form">
        <form action="" method="POST" className="contact-inputs">
          
          <input type="text" 
          placeholder="username" 
          name="username"
          required
          autoComplete="off" />

          <input type="email" 
          placeholder="Email"
          name="email" 
          required
          autoComplete="off"
          />

          <textarea name="Message" 
          cols="30" 
          rows="10"
          required
          autoComplete=""></textarea>

          <input type="submit" value="Send"/>
        </form>
      </div>
     </div>
  </Wrapper>;
};

export default Contact;
