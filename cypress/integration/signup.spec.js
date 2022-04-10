import signupPage from "../pages/SignupPage";
import signUpFactory from "../factories/SignupFactory";

describe("Signup", () => {
  it("User should become a deliveryman", function () {
    var deliveryman = signUpFactory.deliveryman();

    signupPage.go();
    signupPage.fillForm(deliveryman);
    signupPage.submit();

    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signupPage.modalContentShouldBe(expectedMessage);
  });

  it("Invalid document", function () {
    var deliveryman = signUpFactory.deliveryman();

    deliveryman.cpf = "000000141aa";

    signupPage.go();
    signupPage.fillForm(deliveryman);
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Invalid email", function () {
    var deliveryman = signUpFactory.deliveryman();

    deliveryman.email = "user.com.br";

    signupPage.go();
    signupPage.fillForm(deliveryman);
    signupPage.submit();
    signupPage.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Required fields", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      signupPage.go();
      signupPage.submit();
    });

    messages.forEach(function (msg) {
      it(`${msg.field} is required`, function () {
        signupPage.alertMessageShouldBe(msg.output);
      });
    });
  });
});
