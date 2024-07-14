"use client"
import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 100px;
  resize: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultMessage = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: ${props => (props.success ? "green" : "red")};
`;

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "bb256319-2eab-4bff-b5b0-4e053df74d69");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <FormTitle>Contact Us</FormTitle>
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="tel" name="phone" placeholder="Phone" />
        <Textarea name="message" placeholder="Message" required></Textarea>
        <Button type="submit">Submit Form</Button>
        <ResultMessage success={result.includes("Successfully")}>{result}</ResultMessage>
      </Form>
    </FormContainer>
  );
}
