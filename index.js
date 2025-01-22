function Encrypt() {
  let descricao = $("#descricao").val();
  let crypt = cryptpru(descricao);

  $("#resultado").val(crypt);
}

function Decrypt() {
  let descricao = $("#descricao").val();
  let crypt = decryptpru(descricao);

  $("#resultado").val(crypt);
}

const cryptpru = (phrase) => {
  return phrase
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((letter) =>
          letter
            .charCodeAt(0)
            .toString(2)
            .padStart(8, "0")
            .replace(/0/g, "po")
            .replace(/1/g, "popo")
        )
        .join("-")
    )
    .join("~");
};
const decryptpru = (prurase) => {
  return prurase
    .split("~")
    .map((word) => {
      return word
        .split("-")
        .map((letter) => {
          const binary = letter
            .replace(/popo(, )*/g, "1")
            .replace(/po(, )*/g, "0");
          return String.fromCharCode(parseInt(binary, 2));
        })
        .join("");
    })
    .join(" ");
};

function speakText() {
  let resultado = $("#resultado").val();

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(resultado);
  window.speechSynthesis.speak(speechSynthesisUtterance);
}
