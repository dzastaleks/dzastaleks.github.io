function flipCard(card) {
  const front = card.querySelector(".front");
  const back = card.querySelector(".back");

  if (front.style.transform === "rotateY(180deg)") {
    front.style.transform = "rotateY(0deg)";
    back.style.transform = "rotateY(-180deg)";
  } else {
    front.style.transform = "rotateY(180deg)";
    back.style.transform = "rotateY(0deg)";
  }
}
