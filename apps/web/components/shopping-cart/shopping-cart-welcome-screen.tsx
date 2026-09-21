export default function ShoppingCartWelcomeScreen() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold">
        L'Offre DVD
        <br />
        <em>Back to the Future</em> !
      </h1>
      <p className="pb-3">
        Plongez dans les années 2000 et profitez de notre promo exclusive sur la
        saga Back to the Future :
      </p>
      <ul className="list-disc list-outside pl-4 pb-3">
        <li>1 DVD : 15 €</li>
        <li>2 volets différents : 10 % de réduction sur les DVDs de la saga</li>
        <li>3 volets différents : 20 % de réduction sur les DVDs de la saga</li>
      </ul>
      <p>Nous proposons également d'autres films à 20 € pièce.</p>
    </div>
  );
}
