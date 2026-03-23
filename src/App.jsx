import { useState, useMemo } from "react";

const GP = {
  blue: "#1955A6", dark: "#173358", appBlue: "#00AEEF",
  black: "#363839", white: "#FFFFFF", bg: "#F4F6FB",
  border: "#DDE4F0", muted: "#7A8599",
  green: "#509944", red: "#A11F22", amber: "#F57B0C",
  lgn: "#EAF5E6", lrd: "#F9EAEB", lam: "#FFF8E6",
};

const SECTIONS = [
  {
    id: "s1", badge: "01", title: "Relationship Factors", weight: 20,
    description: "Relationship is a broad term. Having some relationship with the customer is generally a good thing and may be a key factor in deciding whether to invest in writing a bid.",
    questions: [
      { title: "Classification of your relationship with the customer", options: [
        { label: "No definable relationship between you and the customer", score: 5 },
        { label: "Limited communications — email exchange or telephone conversations", score: 10 },
        { label: "A business development meeting and various communications", score: 15 },
        { label: "Several meetings, multiple communications — may include a pitch presentation", score: 20 },
        { label: "Multiple interactions including a proof of concept, demonstration or product/service trial", score: 30 },
        { label: "Multi-layered interactions — you are considered an influencer in the customer's thinking", score: 40 },
      ]},
      { title: "Do you believe that relationship will be a factor in the evaluation process?", options: [
        { label: "Yes", score: 5 }, { label: "No", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "How aware of your brand/market presence is the customer?", options: [
        { label: "Not very aware", score: 5 }, { label: "Somewhat aware", score: 10 },
        { label: "Very aware", score: 20 }, { label: "Not sure", score: 5 },
      ]},
      { title: "Relationship between the customer and the incumbent supplier", options: [
        { label: "No knowledge or understanding of the relationship", score: 5 },
        { label: "Limited understanding — relationship appears good", score: 5 },
        { label: "Limited understanding — relationship appears average or poor", score: 20 },
        { label: "Customer has will to change and no specific allegiance to incumbent", score: 30 },
        { label: "Good understanding — you know the customer will change", score: 40 },
      ]},
      { title: "Your understanding of the customer's needs and objectives", options: [
        { label: "Limited to what the ITT defines", score: 10 },
        { label: "Can add deeper insight gained through capture/BD work", score: 20 },
      ]},
      { title: "Cultural fit between your business and the customer", options: [
        { label: "Not aware of any specific cultural alignment", score: 0 },
        { label: "Nominal fit — share similar values", score: 5 },
        { label: "Good alignment — shared vision and values", score: 10 },
        { label: "Excellent cultural alignment — clear empathy with the customer", score: 20 },
      ]},
    ]
  },
  {
    id: "s2", badge: "02", title: "Solution Factors", weight: 20,
    description: "It is important that your service or product closely aligns with the specifications, needs, and objectives defined by the customer — and that you can express the solution in terms of the clear value it will deliver.",
    questions: [
      { title: "Does your service or product meet the customer's needs/objectives?", options: [
        { label: "Meets some of their needs/objectives", score: 10 },
        { label: "Meets most of their needs/objectives", score: 20 },
        { label: "Meets 100% of their needs/objectives", score: 40 },
        { label: "Meets 100% of needs/objectives and delivers substantially more", score: 50 },
        { label: "Not sure if it meets their needs at this stage", score: 10 },
        { label: "Do not have the right solution to meet their needs", score: 0 },
      ]},
      { title: "Will they recognise that your solution is exceptional?", options: [
        { label: "Yes", score: 10 }, { label: "No", score: 5 }, { label: "Not sure", score: 5 },
      ]},
      { title: "Features vs. Benefits — can you articulate value outcomes?", options: [
        { label: "Solution described only in terms of features — no specific quantifiable value", score: 5 },
        { label: "Clear beneficial outcomes that can be linked to features", score: 20 },
        { label: "Benefits substantially more than those of competitors", score: 30 },
        { label: "Unable to answer this question", score: 5 },
      ]},
      { title: "Quantification of benefits as a value", options: [
        { label: "Can quantify some of the value the customer will receive", score: 10 },
        { label: "Can quantify most of the value the customer will receive", score: 10 },
        { label: "Can quantify all of the value the customer will receive", score: 20 },
        { label: "Unable to offer quantification with any degree of certainty", score: 5 },
        { label: "Unable to answer this question", score: 0 },
      ]},
      { title: "Compelling evidence to support your value and performance claims", options: [
        { label: "Reasonable evidence to support some claims", score: 5 },
        { label: "Reasonable evidence to support most or all claims", score: 10 },
        { label: "Exceptional evidence to support some claims", score: 20 },
        { label: "Exceptional independently-assessed evidence for most or all claims", score: 30 },
        { label: "No evidence to offer", score: 0 },
      ]},
    ]
  },
  {
    id: "s3", badge: "03", title: "Commercial Factors", weight: 20,
    description: "The price you charge must make sense in four critical areas: your margin and sustainability, matching what the customer expects to pay, being competitive against competitors, and reflecting market positioning.",
    questions: [
      { title: "Can you price competitively and still make a gross margin that will sustain the service?", options: [
        { label: "Likely to make a small loss initially — margin will improve as the contract matures", score: 20 },
        { label: "Will break even initially — gross margin will improve with cost efficiencies", score: 30 },
        { label: "Pricing likely to deliver a good gross margin on revenue generated", score: 40 },
        { label: "Unsure what the gross margin will be — too difficult to predict accurately", score: 10 },
      ]},
      { title: "If you win, will the price charged return an acceptable net margin?", options: [
        { label: "Yes", score: 20 }, { label: "No", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "Where does your price sit compared to the marketplace average?", options: [
        { label: "Typically below market average", score: 30 },
        { label: "Typically at or near market average", score: 30 },
        { label: "Typically above market average", score: 20 },
        { label: "Not sure", score: 5 },
      ]},
      { title: "How does your pricing compare to your nearest like-for-like competitor?", options: [
        { label: "Always the most expensive", score: 10 },
        { label: "Sometimes the most expensive", score: 10 },
        { label: "Somewhere in the middle", score: 30 },
        { label: "Sometimes the most competitive", score: 30 },
        { label: "Always the most competitive", score: 40 },
        { label: "Not sure", score: 10 },
      ]},
      { title: "Do you know what the customer will consider a fair price?", options: [
        { label: "Yes", score: 10 }, { label: "No", score: 5 }, { label: "Not sure", score: 5 },
      ]},
      { title: "How confident are you in pricing this competitively, sustainably and plausibly?", options: [
        { label: "Very sure", score: 50 }, { label: "Quite sure", score: 30 },
        { label: "Undecided", score: 10 }, { label: "Not at all sure", score: 5 },
      ]},
    ]
  },
  {
    id: "s4", badge: "04", title: "Competition Factors", weight: 20,
    description: "Understanding who your competition is and their likely strategy is critical. You will want to neutralise their strengths and capitalise on areas where they have an underdeveloped or inadequate solution.",
    questions: [
      { title: "Do you know who you will be competing with?", options: [
        { label: "Know competitors and have a good understanding of their likely strategy", score: 50 },
        { label: "Can reasonably predict competitors and have a reasonable understanding of strategy", score: 30 },
        { label: "Unsure of competitors and cannot predict their strategy", score: 20 },
        { label: "Do not know who you are up against or their strategy", score: 5 },
      ]},
      { title: "Are you considered a key player in your marketplace?", options: [
        { label: "Yes — well known with many similar customers", score: 30 },
        { label: "Yes — well known, many similar customers, ranked in topmost tier", score: 20 },
        { label: "Reasonably well known — a middle-market player", score: 20 },
        { label: "Not well known — lower half of the market", score: 10 },
        { label: "New entrant to the market", score: 10 },
      ]},
      { title: "Innovation — what does your proposal offer?", options: [
        { label: "Many new and innovative approaches leading to significant benefits", score: 20 },
        { label: "Some innovation that will overall improve on current approaches", score: 30 },
        { label: "A service that reflects what the customer currently receives", score: 15 },
        { label: "Not sure if the proposal differs from what the customer currently receives", score: 0 },
      ]},
      { title: "How confident are you that you can match competitors in your solution?", options: [
        { label: "Very confident", score: 50 }, { label: "Somewhat confident", score: 40 },
        { label: "Marginally confident", score: 30 }, { label: "Somewhat unconfident", score: 20 },
        { label: "Very unconfident", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "How confident are you that you can match competitors on price?", options: [
        { label: "Very confident", score: 50 }, { label: "Somewhat confident", score: 40 },
        { label: "Marginally confident", score: 30 }, { label: "Somewhat unconfident", score: 20 },
        { label: "Very unconfident", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "How confident are you that you can match competitors in all other bid areas?", options: [
        { label: "Very confident", score: 50 }, { label: "Somewhat confident", score: 40 },
        { label: "Marginally confident", score: 30 }, { label: "Somewhat unconfident", score: 20 },
        { label: "Very unconfident", score: 10 }, { label: "Not sure", score: 0 },
      ]},
    ]
  },
  {
    id: "s5", badge: "05", title: "General Assessment", weight: 20,
    description: "These final questions act as checks and balances for previously given answers. Please be thoughtful and honest in the responses you give.",
    questions: [
      { title: "What has been your win rate for similar bids over the past 12 months?", options: [
        { label: "Between 76% and 100%", score: 50 }, { label: "Between 51% and 75%", score: 50 },
        { label: "Between 26% and 50%", score: 50 }, { label: "Between 11% and 25%", score: 20 },
        { label: "Between 5% and 10%", score: 10 }, { label: "Lower than 5%", score: 5 },
      ]},
      { title: "Do you feel you have been given enough time to prepare this bid?", options: [
        { label: "Yes — good lead time to submission deadline", score: 40 },
        { label: "Lead time is shorter than ideal but manageable", score: 30 },
        { label: "Very short lead time — will struggle to submit anything other than a basic bid", score: 20 },
        { label: "No — too little time to deliver the bid we would want to", score: 10 },
        { label: "Good lead time but we are late acting upon the ITT/RFP", score: 0 },
      ]},
      { title: "What percentage of the ITT/RFP requirements are you fully compliant with?", options: [
        { label: "Between 76% and 100%", score: 50 }, { label: "Between 51% and 75%", score: 40 },
        { label: "Between 26% and 50%", score: 10 }, { label: "Between 11% and 25%", score: 0 },
        { label: "Between 5% and 10%", score: 0 }, { label: "Lower than 5%", score: 0 },
      ]},
      { title: "How confident are you that you can plan and write a compelling bid?", options: [
        { label: "Very confident", score: 40 }, { label: "Quite confident", score: 30 },
        { label: "Marginally confident", score: 20 }, { label: "Somewhat unconfident", score: 10 },
        { label: "Very unconfident", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "How confident are you that you have the correct resources to deliver the bid?", options: [
        { label: "Very confident", score: 50 }, { label: "Somewhat confident", score: 40 },
        { label: "Marginally confident", score: 30 }, { label: "Somewhat unconfident", score: 20 },
        { label: "Very unconfident", score: 10 }, { label: "Not sure", score: 0 },
      ]},
      { title: "How important is this bid to your business?", options: [
        { label: "Mission critical — of the highest strategic importance", score: 50 },
        { label: "Important to win — exactly the kind of business we want", score: 40 },
        { label: "We want to win but it will not affect us if we do not", score: 20 },
        { label: "Not critical — we have not factored the win into our forecasts", score: 0 },
      ]},
    ]
  },
];

// Compute max score per section
const sectionMaxScore = (section) =>
  section.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);

// SVG Gauge component

function generatePDF(opp, results, answers) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210, M = 16, CW = W - M * 2;
  const C = {
    dark:[23,51,88], blue:[25,85,166], appBlue:[0,174,239],
    green:[80,153,68], amber:[245,123,12], red:[161,31,34],
    muted:[122,133,153], border:[221,228,240], bg:[244,246,251],
    black:[54,56,57], white:[255,255,255],
    lgn:[234,245,230], lrd:[249,234,235], lam:[255,244,232], lbl:[234,241,251],
  };
  let y = 0;

  const newPage = () => {
    addFooter();
    doc.addPage();
    doc.setFillColor(...C.dark); doc.rect(0, 0, W, 10, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(...C.white);
    doc.text('BID NO BID APP — BY GROUP PERFECT', M, 6.5);
    doc.setFont('helvetica','normal'); doc.setTextColor(...C.muted);
    doc.text('groupperfect.co.uk', W - M, 6.5, { align: 'right' });
    y = 16;
  };

  const check = (need) => { if (y + need > 274) newPage(); };

  const secHdr = (title, col) => {
    check(14);
    doc.setFillColor(...(col || C.blue)); doc.rect(M, y, CW, 6.5, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...C.white);
    doc.text(title.toUpperCase(), M + 3.5, y + 4.5);
    y += 10;
  };

  const addFooter = () => {
    const pages = doc.internal.getNumberOfPages();
    doc.setPage(pages);
    doc.setFillColor(...C.dark); doc.rect(0, 284, W, 13, 'F');
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.muted);
    doc.text('groupperfect.co.uk', M, 290.5);
    doc.text('Bid No Bid App — Confidential', W/2, 290.5, { align:'center' });
    doc.text('Page ' + pages, W - M, 290.5, { align:'right' });
  };

  const verdict = results.verdict;
  const vCol = verdict === 'Bid' ? C.green : verdict === 'Bid with Caution' ? C.amber : C.red;
  const vBg  = verdict === 'Bid' ? C.lgn   : verdict === 'Bid with Caution' ? C.lam   : C.lrd;
  const score = Math.round(results.weightedScore);

  // PAGE 1 HEADER
  doc.setFillColor(...C.dark); doc.rect(0, 0, W, 38, 'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.setTextColor(...C.white);
  doc.text('Bid No Bid App', M, 16);
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(170,195,225);
  doc.text('by Group Perfect', M, 22);
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(...C.white);
  doc.text(opp.name || 'Bid Assessment', W - M, 16, { align:'right' });
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(170,195,225);
  if (opp.client)   doc.text('Client: ' + opp.client, W - M, 22, { align:'right' });
  if (opp.value)    doc.text('Value: ' + opp.value + (opp.deadline ? '   |   Deadline: ' + opp.deadline : ''), W - M, 28, { align:'right' });
  doc.text('Generated ' + new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}), W - M, 34, { align:'right' });
  y = 45;

  // VERDICT
  const reasoningText = results.verdict === 'Bid'
    ? 'Your score of ' + score + '% suggests this is a strong opportunity worth pursuing. Your strongest section is ' + results.strongestSection + '. Lean into this in your bid strategy.'
    : results.verdict === 'Bid with Caution'
    ? 'Your score of ' + score + '% puts this in the amber zone. You can bid but should address key risks first — particularly in ' + results.weakestSection + ' where your score is lowest.'
    : 'Your score of ' + score + '% suggests this may not be the right opportunity. Your weakest area is ' + results.weakestSection + '. Unless circumstances change, your resources may be better deployed elsewhere.';

  const rLines = doc.splitTextToSize(reasoningText, CW - 16);
  const bh = Math.max(38, 28 + rLines.length * 5.5 + 4);
  doc.setFillColor(...vBg); doc.roundedRect(M, y, CW, bh, 3, 3, 'F');
  doc.setDrawColor(...vCol); doc.setLineWidth(2);
  doc.roundedRect(M, y, CW, bh, 3, 3, 'S');
  doc.setFont('helvetica','bold'); doc.setFontSize(28); doc.setTextColor(...vCol);
  doc.text(verdict, M + 8, y + 16);
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(...C.muted);
  doc.text('Weighted score: ' + score + '% of maximum', M + 8, y + 22);
  doc.setDrawColor(...vCol); doc.setLineWidth(0.5);
  doc.line(M + 8, y + 25, M + CW - 8, y + 25);
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(...C.black);
  let ty = y + 31;
  rLines.forEach(line => { doc.text(line, M + 8, ty); ty += 5.3; });
  y += bh + 6;

  // SCORE BREAKDOWN
  secHdr('Score Breakdown by Section');
  results.sectionResults.forEach((sr, i) => {
    check(9);
    const col = sr.pct >= 66 ? C.green : sr.pct >= 33 ? C.amber : C.red;
    const bW = CW * 0.48;
    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.black);
    doc.text(SECTIONS[i].badge + '  ' + SECTIONS[i].title, M, y + 3.2);
    doc.setFillColor(...C.border); doc.rect(M + 62, y + 0.5, bW, 5, 'F');
    doc.setFillColor(...col); doc.rect(M + 62, y + 0.5, bW * (sr.pct / 100), 5, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...col);
    doc.text(Math.round(sr.pct) + '%', M + 62 + bW + 4, y + 3.2);
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.muted);
    doc.text('Weight: ' + SECTIONS[i].weight + '%', W - M, y + 3.2, { align:'right' });
    y += 9;
  });
  y += 3;
  doc.setFillColor(...C.border); doc.rect(M, y, CW, 6, 'F');
  doc.setFillColor(...vCol); doc.rect(M, y, CW * (score / 100), 6, 'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...C.white);
  doc.text('Weighted Total: ' + score + '%', M + 3, y + 3.8);
  y += 10;

  // SECTION DETAIL - page 2
  newPage();
  SECTIONS.forEach((sec, si) => {
    const sr = results.sectionResults[si];
    const vcol = sr.pct >= 66 ? C.green : sr.pct >= 33 ? C.amber : C.red;
    check(18);
    doc.setFillColor(...C.dark); doc.rect(M, y, CW, 7.5, 'F');
    doc.setFillColor(...vcol); doc.rect(M + CW - 22, y, 22, 7.5, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(...C.white);
    doc.text('SECTION ' + sec.badge + '  —  ' + sec.title.toUpperCase(), M + 3.5, y + 4.8);
    doc.text(Math.round(sr.pct) + '%', M + CW - 11, y + 4.8, { align:'center' });
    y += 11;

    sec.questions.forEach((q, qi) => {
      const ans = answers[si][qi];
      if (ans === null) return;
      const opt = q.options[ans];
      const pctQ = opt.score / Math.max(...q.options.map(o => o.score));
      const qcol = pctQ >= 0.66 ? C.green : pctQ >= 0.33 ? C.amber : C.red;
      check(11);
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...C.muted);
      doc.text(q.title.length > 72 ? q.title.slice(0,71) + '…' : q.title, M + 2, y + 2.5);
      doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...C.black);
      doc.text(opt.label.length > 68 ? opt.label.slice(0,67) + '…' : opt.label, M + 5, y + 7);
      const bW = 22;
      doc.setFillColor(...C.border); doc.rect(W - M - bW - 18, y + 2, bW, 2.5, 'F');
      doc.setFillColor(...qcol); doc.rect(W - M - bW - 18, y + 2, bW * pctQ, 2.5, 'F');
      doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(...qcol);
      doc.text(opt.score + '/' + Math.max(...q.options.map(o=>o.score)), W - M, y + 6.5, { align:'right' });
      doc.setDrawColor(...C.border); doc.setLineWidth(0.3);
      doc.line(M, y + 10, M + CW, y + 10);
      y += 11;
    });
    y += 5;
  });

  // DISCLAIMER at end
  check(20);
  const dText = 'This tool is provided as an aide to decision-making only. Group Perfect accepts no liability for any decision made as a result of using this service. Please consider all relevant factors before committing to a bid.';
  const dLines = doc.splitTextToSize(dText, CW - 24);
  const dh = dLines.length * 4.5 + 10;
  doc.setFillColor(255,244,232); doc.roundedRect(M, y, CW, dh, 2, 2, 'F');
  doc.setDrawColor(245,123,12); doc.setLineWidth(0.5);
  doc.roundedRect(M, y, CW, dh, 2, 2, 'S');
  doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(180,80,0);
  doc.text('Disclaimer:', M + 4, y + 5.5);
  let dy = y + 10.5;
  doc.setFont('helvetica','italic'); doc.setFontSize(7.5); doc.setTextColor(...C.muted);
  dLines.forEach(line => { doc.text(line, M + 4, dy); dy += 4.5; });

  addFooter();
  const fname = 'bid-no-bid-' + (opp.name || 'assessment').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') + '.pdf';
  doc.save(fname);
}

const Gauge = ({ pct, verdict }) => {
  const r = 72, cx = 100, cy = 95;
  const startAngle = -200, totalArc = 220;
  const toRad = d => (d * Math.PI) / 180;
  const arc = (cx, cy, r, startDeg, endDeg) => {
    const s = { x: cx + r * Math.cos(toRad(startDeg)), y: cy + r * Math.sin(toRad(startDeg)) };
    const e = { x: cx + r * Math.cos(toRad(endDeg)), y: cy + r * Math.sin(toRad(endDeg)) };
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };
  const clampedPct = Math.max(0, Math.min(100, pct));
  const needleAngle = startAngle + (clampedPct / 100) * totalArc;
  const nx = cx + (r - 10) * Math.cos(toRad(needleAngle));
  const ny = cy + (r - 10) * Math.sin(toRad(needleAngle));
  const noEnd = startAngle + totalArc * 0.33;
  const cauEnd = startAngle + totalArc * 0.66;
  const biEnd = startAngle + totalArc;
  const col = pct < 33 ? GP.red : pct < 66 ? GP.amber : GP.green;
  const bgCol = pct < 33 ? GP.lrd : pct < 66 ? GP.lam : GP.lgn;
  return (
    <div style={{ background: bgCol, borderRadius: 14, padding: "20px 16px 14px", border: `2px solid ${col}` }}>
      <svg viewBox="0 0 200 110" style={{ width: "100%", maxWidth: 220, display: "block", margin: "0 auto" }}>
        <path d={arc(cx,cy,r,startAngle,noEnd)} fill="none" stroke={GP.red} strokeWidth="10" strokeLinecap="round"/>
        <path d={arc(cx,cy,r,noEnd,cauEnd)} fill="none" stroke={GP.amber} strokeWidth="10" strokeLinecap="round"/>
        <path d={arc(cx,cy,r,cauEnd,biEnd)} fill="none" stroke={GP.green} strokeWidth="10" strokeLinecap="round"/>
        <path d={arc(cx,cy,r,startAngle,needleAngle)} fill="none" stroke={col} strokeWidth="10" strokeLinecap="round" opacity="0.3"/>
        <circle cx={cx} cy={cy} r="6" fill={GP.dark}/>
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={GP.dark} strokeWidth="3" strokeLinecap="round"/>
        <text x={cx+r+4} y={cy+28} fontSize="8" fill={GP.green} fontWeight="700" textAnchor="middle">BID</text>
        <text x={cx-r-4} y={cy+28} fontSize="8" fill={GP.red} fontWeight="700" textAnchor="middle">NO BID</text>
        <text x={cx} y={cy-r-10} fontSize="7" fill={GP.amber} fontWeight="700" textAnchor="middle">BID WITH CAUTION</text>
      </svg>
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: col }}>{verdict}</div>
        <div style={{ fontSize: 11, color: GP.muted, marginTop: 2 }}>
          {pct > 0 ? `${Math.round(pct)}% of maximum score` : "Answer questions to see your result"}
        </div>
      </div>
    </div>
  );
};

const initAnswers = () => SECTIONS.map(s => Array(s.questions.length).fill(null));
const initWeights = () => Object.fromEntries(SECTIONS.map(s => [s.id, s.weight]));

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState(initAnswers);
  const [weights, setWeights] = useState(initWeights);
  const [opp, setOpp] = useState({ name: "", client: "", value: "", deadline: "" });
  const [showIntro, setShowIntro] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportEmail, setExportEmail] = useState("");

  const handleAnswer = (secIdx, qIdx, optIdx) => {
    setAnswers(prev => {
      const next = prev.map(s => [...s]);
      next[secIdx][qIdx] = optIdx;
      return next;
    });
  };

  // Compute overall weighted score
  const results = useMemo(() => {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 100;
    let weightedScore = 0;
    const sectionResults = SECTIONS.map((sec, si) => {
      const maxScore = sectionMaxScore(sec);
      let score = 0;
      answers[si].forEach((ans, qi) => {
        if (ans !== null) score += sec.questions[qi].options[ans].score;
      });
      const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
      const answered = answers[si].filter(a => a !== null).length;
      const w = weights[sec.id] || 0;
      weightedScore += (pct * w) / totalWeight;
      return { score, maxScore, pct, answered, total: sec.questions.length };
    });
    const totalAnswered = sectionResults.reduce((a, s) => a + s.answered, 0);
    const totalQs = sectionResults.reduce((a, s) => a + s.total, 0);
    const verdict = weightedScore < 33 ? "No Bid" : weightedScore < 66 ? "Bid with Caution" : "Bid";
    const verdictCol = weightedScore < 33 ? GP.red : weightedScore < 66 ? GP.amber : GP.green;
    const verdictBg = weightedScore < 33 ? GP.lrd : weightedScore < 66 ? GP.lam : GP.lgn;
    const sortedByPct = [...sectionResults].map((sr,i)=>({...sr,i})).sort((a,b)=>b.pct-a.pct);
    const strongestSection = SECTIONS[sortedByPct[0].i].title;
    const weakestSection = SECTIONS[sortedByPct[sortedByPct.length-1].i].title;
    return { weightedScore, sectionResults, verdict, verdictCol, verdictBg, totalAnswered, totalQs, strongestSection, weakestSection };
  }, [answers, weights]);

  const sec = SECTIONS[currentSection];
  const sr = results.sectionResults[currentSection];

  const reasoning = () => {
    const { verdict, weightedScore, sectionResults } = results;
    const weakest = [...sectionResults].sort((a,b)=>a.pct-b.pct)[0];
    const strongest = [...sectionResults].sort((a,b)=>b.pct-a.pct)[0];
    const weakSec = SECTIONS[sectionResults.indexOf(weakest)];
    const strongSec = SECTIONS[sectionResults.indexOf(strongest)];
    if (verdict === "Bid") return `Your overall score of ${Math.round(weightedScore)}% suggests this is a strong opportunity worth pursuing. Your strongest area is ${strongSec.title} — lean into this in your bid strategy.${weakest.pct < 50 ? ` Watch out for ${weakSec.title} — this is your weakest area and could undermine an otherwise strong bid.` : ""}`;
    if (verdict === "Bid with Caution") return `Your score of ${Math.round(weightedScore)}% puts this opportunity in the amber zone. You can bid but should address key risks first — particularly in ${weakSec.title} where your score is lowest. Consider whether there are actions you can take before committing fully.`;
    return `Your score of ${Math.round(weightedScore)}% suggests this may not be the right opportunity to pursue. Your weakest area is ${weakSec.title}. Unless circumstances change significantly, the evidence suggests your resources would be better deployed elsewhere.`;
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: GP.bg, minHeight: "100vh", color: GP.black }}>
      <style>{`
        .bnb-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        .bnb-sidebar { position: sticky; top: 20px; }
        .bnb-opp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .bnb-section-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .bnb-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        @media (max-width: 900px) {
          .bnb-grid { grid-template-columns: 1fr; }
          .bnb-sidebar { position: static; }
          .bnb-section-breakdown { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .bnb-opp-grid { grid-template-columns: 1fr; }
          .bnb-kpi-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .bnb-kpi-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: GP.dark, padding: "0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: GP.white }}>Group Perfect</div>
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)" }}/>
            <div style={{ fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,0.8)" }}>Bid / No Bid Analyser</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>

            <button onClick={() => setShowExport(true)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: GP.appBlue, color: GP.white, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Export PDF ↗
            </button>
          </div>
        </div>
      </div>


            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px 80px" }} className="bnb-grid">

        {/* LEFT COLUMN */}
        <div>

          {/* Opportunity Details */}
          <div style={{ background: GP.white, borderRadius: 12, border: `1px solid ${GP.border}`, padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: GP.dark, marginBottom: 14 }}>Opportunity Details</div>
            <div className="bnb-opp-grid">
              {[
                ["Opportunity name", "name", "e.g. FM Services — Birmingham City Council"],
                ["Client / Buyer", "client", "e.g. Birmingham City Council"],
                ["Estimated contract value", "value", "e.g. £2.4m"],
                ["Submission deadline", "deadline", "DD/MM/YYYY"],
              ].map(([lbl, key, ph]) => (
                <div key={key}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: GP.muted, marginBottom: 5 }}>{lbl}</div>
                  <input value={opp[key]} onChange={e => setOpp(prev => ({...prev, [key]: e.target.value}))} placeholder={ph}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${GP.border}`, fontSize: 13, fontFamily: "inherit", color: GP.black, background: GP.bg }} />
                </div>
              ))}
            </div>
          </div>

          {/* Section nav */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {SECTIONS.map((s, i) => {
              const sr2 = results.sectionResults[i];
              const done = sr2.answered === sr2.total;
              const active = i === currentSection;
              return (
                <button key={s.id} onClick={() => setCurrentSection(i)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${active ? GP.blue : done ? GP.green : GP.border}`,
                    background: active ? GP.blue : done ? GP.lgn : GP.white,
                    color: active ? GP.white : done ? GP.green : GP.muted,
                    fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{s.badge}</span>
                  {s.title}
                  {done && <span style={{ fontSize: 11 }}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* Current section */}
          <div style={{ background: GP.white, borderRadius: 12, border: `1px solid ${GP.border}`, overflow: "hidden" }}>
            {/* Section header */}
            <div style={{ background: GP.dark, padding: "18px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>
                Section {sec.badge}
              </div>
              <div style={{ color: GP.white, fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{sec.title}</div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, lineHeight: 1.7, fontWeight: 600 }}>{sec.description}</div>
            </div>

            {/* Section score bar */}
            <div style={{ padding: "12px 24px", background: GP.bg, borderBottom: `1px solid ${GP.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, color: GP.muted }}>
                {sr.answered} of {sr.total} questions answered
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 120, height: 4, borderRadius: 2, background: GP.border, overflow: "hidden" }}>
                  <div style={{ width: `${sr.pct}%`, height: "100%", background: sr.pct >= 66 ? GP.green : sr.pct >= 33 ? GP.amber : GP.red, borderRadius: 2, transition: "width 0.4s" }}/>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: sr.pct >= 66 ? GP.green : sr.pct >= 33 ? GP.amber : GP.red }}>
                  {Math.round(sr.pct)}%
                </div>
              </div>
            </div>

            {/* Questions */}
            <div style={{ padding: "20px 24px" }}>
              {sec.questions.map((q, qi) => (
                <div key={qi} style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: GP.dark, marginBottom: 10, lineHeight: 1.5 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: GP.muted, marginRight: 6 }}>Q{qi+1}</span>
                    {q.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {q.options.map((opt, oi) => {
                      const selected = answers[currentSection][qi] === oi;
                      const maxOptScore = Math.max(...q.options.map(o => o.score));
                      const rel = opt.score / maxOptScore;
                      return (
                        <button key={oi} onClick={() => handleAnswer(currentSection, qi, oi)}
                          style={{ textAlign: "left", padding: "11px 14px", borderRadius: 9, border: `1.5px solid ${selected ? GP.blue : GP.border}`,
                            background: selected ? "#EAF1FB" : GP.bg,
                            cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                          <span style={{ fontSize: 13, color: selected ? GP.blue : GP.black, fontWeight: selected ? 600 : 400, lineHeight: 1.5 }}>{opt.label}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            <div style={{ width: 40, height: 3, borderRadius: 2, background: GP.border, overflow: "hidden" }}>
                              <div style={{ width: `${rel*100}%`, height: "100%", background: selected ? GP.blue : GP.muted, borderRadius: 2 }}/>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: selected ? GP.blue : GP.muted, minWidth: 20 }}>{opt.score}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Next/Back */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 16, borderTop: `1px solid ${GP.border}` }}>
                <button onClick={() => { setCurrentSection(i => Math.max(0, i-1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentSection === 0}
                  style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${GP.border}`, background: GP.white, color: currentSection === 0 ? GP.border : GP.dark, fontSize: 13, fontWeight: 700, cursor: currentSection === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
                  ← Back
                </button>
                {currentSection < SECTIONS.length - 1 ? (
                  <button onClick={() => { setCurrentSection(i => i+1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ padding: "10px 22px", borderRadius: 8, border: "none", background: GP.blue, color: GP.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Next Section →
                  </button>
                ) : (
                  <button onClick={() => setShowExport(true)}
                    style={{ padding: "10px 22px", borderRadius: 8, border: "none", background: GP.appBlue, color: GP.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    See Full Results & Export →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results panel — shown when enough answered */}
          {currentSection === SECTIONS.length - 1 && results.totalAnswered > 0 && (
            <div style={{ background: GP.dark, borderRadius: 14, marginTop: 24, overflow: "hidden" }}>
              <div style={{ padding: "22px 28px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: GP.white, fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Your Recommendation</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  {opp.name ? `${opp.name}${opp.client ? " — " + opp.client : ""}` : "Based on your answers so far"}
                </div>
              </div>
              <div style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: results.verdictBg, borderRadius: 12, padding: "20px", border: `2px solid ${results.verdictCol}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: results.verdictCol, letterSpacing: "-0.5px" }}>{results.verdict}</div>
                  <div style={{ fontSize: 12, color: GP.muted, marginTop: 4 }}>{Math.round(results.weightedScore)}% weighted score</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Section Breakdown</div>
                  {SECTIONS.map((s, i) => {
                    const sr3 = results.sectionResults[i];
                    const col = sr3.pct >= 66 ? GP.green : sr3.pct >= 33 ? GP.amber : GP.red;
                    return (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", width: 110, flexShrink: 0, fontWeight: 600 }}>{s.title.split(" ")[0]}</div>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                          <div style={{ width: `${sr3.pct}%`, height: "100%", background: col, borderRadius: 2 }}/>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: col, minWidth: 32, textAlign: "right" }}>{Math.round(sr3.pct)}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>In Plain English</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.92)", lineHeight: 1.8, fontWeight: 600 }}>{reasoning()}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bnb-sidebar">
          <div style={{ background: GP.white, borderRadius: 12, border: `1px solid ${GP.border}`, padding: "20px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: GP.dark, marginBottom: 14 }}>Live Score</div>
            <Gauge pct={results.weightedScore} verdict={results.verdict} />
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["Questions answered", `${results.totalAnswered} / ${results.totalQs}`],
                ["Weighted score", `${Math.round(results.weightedScore)}%`],
              ].map(([l,v]) => (
                <div key={l} style={{ background: GP.bg, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: GP.dark }}>{v}</div>
                  <div style={{ fontSize: 10, color: GP.muted, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section progress */}
          <div style={{ background: GP.white, borderRadius: 12, border: `1px solid ${GP.border}`, padding: "16px 20px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: GP.dark, marginBottom: 12 }}>Section Progress</div>
            {SECTIONS.map((s, i) => {
              const sr4 = results.sectionResults[i];
              const col = sr4.pct >= 66 ? GP.green : sr4.pct >= 33 ? GP.amber : sr4.answered > 0 ? GP.red : GP.border;
              return (
                <div key={s.id} onClick={() => setCurrentSection(i)} style={{ marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: i === currentSection ? GP.blue : GP.black, fontWeight: i === currentSection ? 700 : 400 }}>{s.badge} {s.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: col }}>{sr4.answered > 0 ? `${Math.round(sr4.pct)}%` : "—"}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: GP.border, overflow: "hidden" }}>
                    <div style={{ width: `${sr4.pct}%`, height: "100%", background: col, borderRadius: 2, transition: "width 0.4s" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Intro / Disclaimer modal */}
      {showIntro && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(23,51,88,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}>
          <div style={{ background: GP.white, borderRadius: 16, maxWidth: 560, width: "100%", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.3)", maxHeight: "90vh", overflowY: "auto" }}>
            
            {/* Modal header */}
            <div style={{ background: GP.dark, padding: "22px 28px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: GP.white }}>Bid No Bid App</div>
                <span style={{ background: "rgba(0,174,239,0.2)", color: GP.appBlue, border: "1px solid rgba(0,174,239,0.4)", borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>by Group Perfect</span>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                An aide to deciding whether to invest your resources in planning and writing a bid. Answer each question honestly — the tool will calculate a weighted score and give you a clear recommendation.
              </div>
            </div>

            <div style={{ padding: "22px 28px" }}>

              {/* How it works */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: GP.dark, marginBottom: 10 }}>Before you begin</div>
                {[
                  ["📋", "Work through all 5 sections — each covers a key aspect of the opportunity"],
                  ["🎯", "Select the answer that most closely matches your honest assessment"],
                  ["⚠", "Unanswered questions will default to the lowest available score"],
                  ["📄", "Export a PDF summary of your results at the end"],
                ].map(([icon, text], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, flexShrink: 0, width: 22, textAlign: "center", marginTop: 1 }}>{icon}</span>
                    <span style={{ fontSize: 13, color: GP.black, lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Disclaimer box */}
              <div style={{ background: GP.bg, borderRadius: 10, padding: "16px 18px", border: `1px solid ${GP.border}`, marginBottom: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: GP.dark, marginBottom: 8 }}>Disclaimer</div>
                <div style={{ fontSize: 12, color: GP.muted, lineHeight: 1.7, marginBottom: 14 }}>
                  This tool will produce a result based only upon the information you provide. Under no circumstances will Group Perfect be held liable for any decision made as a result of using this service. Please consider all relevant factors before committing to a bid.
                </div>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                    style={{ marginTop: 2, width: 16, height: 16, accentColor: GP.blue, flexShrink: 0, cursor: "pointer" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: GP.dark, lineHeight: 1.5 }}>
                    I understand and agree to the above before proceeding
                  </span>
                </label>
              </div>

              {/* CTA */}
              <button
                onClick={() => { if (agreed) setShowIntro(false); }}
                style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none",
                  background: agreed ? GP.dark : GP.border,
                  color: agreed ? GP.white : GP.muted,
                  fontSize: 15, fontWeight: 800, cursor: agreed ? "pointer" : "default",
                  fontFamily: "'Manrope', sans-serif",
                  transition: "background 0.2s, color 0.2s" }}>
                {agreed ? "Let's get started →" : "Please agree to the disclaimer to continue"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Export modal */}
      {showExport && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(23,51,88,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: GP.white, borderRadius: 16, padding: "24px", maxWidth: 440, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: GP.dark, marginBottom: 6 }}>Export Your Results</div>
            <div style={{ fontSize: 13, color: GP.muted, marginBottom: 22, lineHeight: 1.6 }}>
              Enter your email address and we will send you a PDF summary of your Bid / No Bid assessment.
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: GP.muted, marginBottom: 6 }}>Email address</div>
              <input value={exportEmail} onChange={e => setExportEmail(e.target.value)} placeholder="you@yourcompany.com"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: `1px solid ${GP.border}`, fontSize: 14, fontFamily: "inherit", color: GP.black }} />
            </div>
            <div style={{ background: "#FFF8E6", border: "1px solid #F0C84A", borderRadius: 8, padding: "10px 14px", fontSize: 11, color: "#856000", marginBottom: 20, fontStyle: "italic" }}>
              This tool is provided as an aide to decision-making. Group Perfect accepts no liability for decisions made as a result of using this service.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowExport(false)} style={{ flex: 1, padding: "12px", borderRadius: 9, border: `1px solid ${GP.border}`, background: GP.white, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: GP.muted }}>
                Cancel
              </button>
              <button onClick={() => {
                if (exportEmail.includes("@")) {
                  try {
                    generatePDF(opp, results, answers);
                    setShowExport(false);
                    setExportEmail("");
                  } catch(e) {
                    console.error(e);
                    alert("PDF generation failed. Please try again.");
                  }
                }
              }}
                style={{ flex: 2, padding: "12px", borderRadius: 9, border: "none", background: GP.appBlue, color: GP.white, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
