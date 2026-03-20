import { useState } from "react";

export default function App() {
  const [capital, setCapital] = useState(10000000);
  const [bonus, setBonus] = useState(0.05);
  const [kelly, setKelly] = useState(0.04);
  const [odds1, setOdds1] = useState(2.0);
  const [odds2, setOdds2] = useState(1.93);
  const [winrate, setWinrate] = useState(0.58);

  const delta = capital * kelly;

  const depositMain = capital / 2 + delta / (2 * (1 + bonus));
  const depositHedge = capital - depositMain;

  const betMain = depositMain * (1 + bonus);
  const betHedge = depositHedge * (1 + bonus);

  const profitMain = betMain * odds1 - capital;
  const profitHedge = betHedge * odds2 - capital;

  const minOdds = 2 / (1 + bonus);
  const isGood = odds2 >= minOdds;

  const ev = winrate * profitMain + (1 - winrate) * profitHedge;

  let suggestion = "";
  if (!isGood) suggestion = "Kèo xấu - Bỏ";
  else if (odds2 < 1.93) suggestion = "Chờ thêm";
  else if (odds2 >= 1.95) suggestion = "Vào mạnh";
  else suggestion = "Có thể vào";

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h2>Betting Tool PRO VIP</h2>

      <input value={capital} onChange={e=>setCapital(+e.target.value)} placeholder="Capital"/><br/>
      <input value={bonus} onChange={e=>setBonus(+e.target.value)} placeholder="Bonus"/><br/>
      <input value={kelly} onChange={e=>setKelly(+e.target.value)} placeholder="Kelly"/><br/>
      <input value={winrate} onChange={e=>setWinrate(+e.target.value)} placeholder="Winrate"/><br/>
      <input value={odds1} onChange={e=>setOdds1(+e.target.value)} placeholder="Odds1"/><br/>
      <input value={odds2} onChange={e=>setOdds2(+e.target.value)} placeholder="Odds2"/><br/>

      <h3>Deposit</h3>
      <p>Main: {depositMain.toFixed(0)}</p>
      <p>Hedge: {depositHedge.toFixed(0)}</p>

      <h3>Profit</h3>
      <p>Main win: {profitMain.toFixed(0)}</p>
      <p>Hedge win: {profitHedge.toFixed(0)}</p>

      <h3>EV: {ev.toFixed(0)}</h3>

      <h3>{isGood ? "GOOD EV" : "BAD EV"}</h3>
      <h3>{suggestion}</h3>
    </div>
  );
}
