import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { IconCert } from "./Icons";
import { generateCitizenId, verifyCitizenId } from "../data/mockData";

export default function DigitalIdSection() {
  // Generator State
  const [citizenName, setCitizenName] = useState("Aarav Sharma");
  const [citizenWard, setCitizenWard] = useState("Ward 7 · Sector 21");
  const [citizenCategory, setCitizenCategory] = useState("Resident Citizen");
  const [generatedCard, setGeneratedCard] = useState(() => {
    const rawId = generateCitizenId();
    const match = /^ORB-2026-(\d{4})-(\d)$/.exec(rawId);
    const digits = match ? match[1] : "4821";
    const check = match ? Number(match[2]) : 6;
    const sum = digits.split("").reduce((acc, d) => acc + Number(d), 0);
    return {
      id: rawId,
      digits,
      sum,
      check,
      name: "Aarav Sharma",
      ward: "Ward 7 · Sector 21",
      category: "Resident Citizen",
      issuedAt: "2026-09-01",
    };
  });

  // Verifier State
  const [verifyInput, setVerifyInput] = useState("ORB-2026-4821-6");
  const [verificationResult, setVerificationResult] = useState(() => {
    // Initial verification for default sample
    const digits = "4821";
    const sum = 4 + 8 + 2 + 1;
    const expected = sum % 9;
    return {
      tested: true,
      isValid: true,
      cleanId: "ORB-2026-4821-6",
      digits: "4821",
      digitsArray: [4, 8, 2, 1],
      sum: 15,
      actualCheck: 6,
      expectedCheck: 6,
      message: "Valid Digital Citizen ID! Matches Orbit Checksum Algorithm.",
    };
  });

  const [copiedId, setCopiedId] = useState(false);

  // Generate new ID handler
  const handleGenerateNewId = () => {
    const rawId = generateCitizenId();
    const match = /^ORB-2026-(\d{4})-(\d)$/.exec(rawId);
    const digits = match ? match[1] : "1234";
    const check = match ? Number(match[2]) : 1;
    const sum = digits.split("").reduce((acc, d) => acc + Number(d), 0);

    const newCard = {
      id: rawId,
      digits,
      sum,
      check,
      name: citizenName || "Citizen of Orbit",
      ward: citizenWard,
      category: citizenCategory,
      issuedAt: new Date().toISOString().split("T")[0],
    };

    setGeneratedCard(newCard);
    setCopiedId(false);
  };

  // Verification Logic
  const handleVerify = (idToVerify) => {
    const raw = (idToVerify !== undefined ? idToVerify : verifyInput).trim().toUpperCase();
    if (!raw) {
      setVerificationResult({
        tested: true,
        isValid: false,
        cleanId: "",
        message: "Please enter a Citizen ID number to verify.",
      });
      return;
    }

    const regex = /^ORB-2026-(\d{4})-(\d)$/;
    const match = regex.exec(raw);

    if (!match) {
      setVerificationResult({
        tested: true,
        isValid: false,
        cleanId: raw,
        message: "Format Invalid: Expected format is ORB-2026-XXXX-C (e.g. ORB-2026-4821-6).",
      });
      return;
    }

    const [, digits, checkStr] = match;
    const digitsArray = digits.split("").map(Number);
    const sum = digitsArray.reduce((acc, d) => acc + d, 0);
    const expectedCheck = sum % 9;
    const actualCheck = Number(checkStr);
    const isValid = actualCheck === expectedCheck;

    setVerificationResult({
      tested: true,
      isValid,
      cleanId: raw,
      digits,
      digitsArray,
      sum,
      actualCheck,
      expectedCheck,
      message: isValid
        ? "Verification Successful: Checksum matched formula (Sum mod 9)."
        : `Verification Failed: Check digit ${actualCheck} does not match computed checksum ${expectedCheck}.`,
    });
  };

  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 3000);
  };

  return (
    <div className="mt-12 bg-paper border border-line rounded-xl shadow-sm overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-ink-navy text-paper p-6 sm:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-lg bg-civic-amber/20 text-civic-amber">
              <IconCert className="w-5 h-5" />
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-paper">
              Digital Citizen ID Generator & Verifier
            </h3>
            <span className="font-mono text-[0.65rem] tracking-wider uppercase bg-transit-teal/30 text-transit-teal border border-transit-teal/40 px-2.5 py-0.5 rounded-full font-bold">
              Formula: Sum mod 9
            </span>
          </div>
          <p className="text-paper/70 text-xs sm:text-sm max-w-2xl">
            Orbit Smart City issues cryptographic Citizen IDs formatted as{" "}
            <code className="font-mono text-civic-amber bg-white/10 px-1.5 py-0.5 rounded font-semibold">
              ORB-2026-XXXX-C
            </code>
            , where <code className="font-mono text-paper font-bold">XXXX</code> is a 4-digit code and{" "}
            <code className="font-mono text-civic-amber font-bold">C</code> is the checksum digit:{" "}
            <span className="font-mono text-paper font-semibold">(d₁ + d₂ + d₃ + d₄) mod 9</span>.
          </p>
        </div>

        {/* Algorithm Badge */}
        <div className="bg-white/[0.07] border border-white/10 rounded-lg p-3 text-xs font-mono self-start md:self-auto min-w-[200px]">
          <div className="text-paper/60 uppercase text-[0.65rem] mb-1">Checksum Formula:</div>
          <div className="text-civic-amber font-bold text-sm">
            Check = (∑ digits) % 9
          </div>
          <div className="text-paper/70 text-[0.7rem] mt-0.5">
            e.g. 4+8+2+1 = 15 ➔ 15 % 9 = 6
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Box 1 (Generator) & Box 2 (Verifier) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-line">
        {/* ========================================================================= */}
        {/* BOX 1: DIGITAL ID GENERATOR                                              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-paper flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-transit-teal text-white flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h4 className="font-display font-bold text-lg text-ink-navy">
                  Generate Citizen ID
                </h4>
              </div>
              <span className="text-[0.7rem] font-mono uppercase text-transit-teal font-semibold bg-transit-teal/10 px-2 py-0.5 rounded">
                Instant Issuance
              </span>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate mb-1">
                  Citizen Full Name
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3 py-2 text-xs border border-line rounded-md bg-paper focus:outline-none focus:ring-2 focus:ring-transit-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate mb-1">
                  Municipal Ward / Zone
                </label>
                <select
                  value={citizenWard}
                  onChange={(e) => setCitizenWard(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-line rounded-md bg-paper focus:outline-none focus:ring-2 focus:ring-transit-teal"
                >
                  <option>Ward 7 · Sector 21</option>
                  <option>Ward 1 · City Centre</option>
                  <option>Ward 3 · Old Quarter Heritage</option>
                  <option>Ward 12 · Tech Park Eco-Zone</option>
                  <option>Ward 14 · Riverfront Promenade</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateNewId}
              className="w-full py-2.5 px-4 rounded-lg bg-ink-navy hover:bg-ink-navy-soft text-paper font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 mb-5"
            >
              <span>⚡</span>
              <span>Generate New Valid Citizen ID</span>
            </button>

            {/* Live Citizen ID Card */}
            {generatedCard && (
              <div className="border border-transit-teal/40 bg-gradient-to-br from-mist/50 via-paper to-mist/20 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-transit-teal/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[0.65rem] font-mono tracking-widest uppercase text-transit-teal font-bold block">
                      Orbit Smart City Authority · Identity Card
                    </span>
                    <h5 className="text-base font-display font-bold text-ink-navy mt-0.5">
                      {generatedCard.name}
                    </h5>
                    <p className="text-xs text-slate-light font-mono">
                      {generatedCard.ward} · {generatedCard.category}
                    </p>
                  </div>

                  <div className="p-1.5 bg-white rounded-md border border-line shadow-xs flex-shrink-0">
                    <QRCodeSVG
                      value={generatedCard.id}
                      size={54}
                      level="M"
                      fgColor="#0E1B2B"
                    />
                  </div>
                </div>

                {/* The Generated ID Number Display */}
                <div className="bg-ink-navy text-paper p-3.5 rounded-lg border border-white/10 flex items-center justify-between mb-3 shadow-inner">
                  <div>
                    <span className="text-[0.65rem] font-mono text-paper/60 uppercase tracking-wider block">
                      Digital Citizen ID Number
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-civic-amber">
                      {generatedCard.id}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyId(generatedCard.id)}
                    className="text-xs font-mono bg-white/10 hover:bg-white/20 text-paper px-3 py-1.5 rounded transition-all flex items-center gap-1.5"
                    title="Copy Citizen ID"
                  >
                    <span>{copiedId ? "✓ Copied" : "📋 Copy"}</span>
                  </button>
                </div>

                {/* Mathematical Checksum Step-by-Step Breakdown */}
                <div className="bg-white/80 border border-line rounded-lg p-3 text-xs font-mono space-y-1">
                  <div className="text-[0.68rem] text-slate-light font-bold uppercase tracking-wider">
                    Formula Calculation Proof:
                  </div>
                  <div className="flex items-center gap-2 text-ink-navy">
                    <span>• 4-Digit Segment:</span>
                    <span className="font-bold text-transit-teal bg-transit-teal/10 px-1.5 py-0.5 rounded">
                      {generatedCard.digits}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-navy">
                    <span>• Sum of Digits:</span>
                    <span className="font-bold">
                      {generatedCard.digits.split("").join(" + ")} = {generatedCard.sum}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-navy">
                    <span>• Checksum (Sum % 9):</span>
                    <span className="font-bold text-civic-amber-dark bg-civic-amber/15 px-1.5 py-0.5 rounded">
                      {generatedCard.sum} mod 9 = {generatedCard.check}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[0.72rem] font-mono text-slate-light">
            <span>Formula: Validated `ORB-2026-XXXX-C`</span>
            <button
              onClick={() => {
                setVerifyInput(generatedCard.id);
                handleVerify(generatedCard.id);
              }}
              className="text-transit-teal hover:underline font-bold"
            >
              Test in Verifier Box →
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOX 2: DIGITAL ID VERIFIER                                               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-mist/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-civic-amber text-ink-navy flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h4 className="font-display font-bold text-lg text-ink-navy">
                  Verify Citizen ID
                </h4>
              </div>
              <span className="text-[0.7rem] font-mono uppercase text-civic-amber-dark font-semibold bg-civic-amber/15 px-2 py-0.5 rounded">
                Checksum Authenticator
              </span>
            </div>

            {/* Input for Verification */}
            <div className="mb-4">
              <label className="block text-xs font-mono font-semibold text-slate mb-1">
                Enter Citizen ID to Validate
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="e.g. ORB-2026-4821-6"
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-mono border border-line rounded-lg bg-paper focus:outline-none focus:ring-2 focus:ring-civic-amber"
                />
                <button
                  onClick={() => handleVerify()}
                  className="px-5 py-2.5 bg-civic-amber hover:bg-civic-amber-dark text-ink-navy font-bold text-xs rounded-lg transition-all shadow-xs flex-shrink-0"
                >
                  Verify ID
                </button>
              </div>
            </div>

            {/* Quick Test Presets for Evaluator */}
            <div className="mb-5 bg-paper p-3 rounded-lg border border-line">
              <span className="text-[0.68rem] font-mono uppercase text-slate-light font-bold block mb-1.5">
                ⚡ Quick Click Test Cases for Viva / Evaluation:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  onClick={() => {
                    const sampleValid = "ORB-2026-4821-6"; // 4+8+2+1=15, 15%9=6
                    setVerifyInput(sampleValid);
                    handleVerify(sampleValid);
                  }}
                  className="px-2.5 py-1 rounded bg-transit-teal/10 hover:bg-transit-teal/20 text-transit-teal font-semibold border border-transit-teal/30 transition-colors"
                >
                  ✓ Valid: ORB-2026-4821-6 (15%9=6)
                </button>
                <button
                  onClick={() => {
                    const sampleValid2 = "ORB-2026-9231-6"; // 9+2+3+1=15, 15%9=6
                    setVerifyInput(sampleValid2);
                    handleVerify(sampleValid2);
                  }}
                  className="px-2.5 py-1 rounded bg-transit-teal/10 hover:bg-transit-teal/20 text-transit-teal font-semibold border border-transit-teal/30 transition-colors"
                >
                  ✓ Valid: ORB-2026-9231-6 (15%9=6)
                </button>
                <button
                  onClick={() => {
                    const sampleInvalid = "ORB-2026-4821-3"; // check is 3 instead of 6
                    setVerifyInput(sampleInvalid);
                    handleVerify(sampleInvalid);
                  }}
                  className="px-2.5 py-1 rounded bg-signal-red/10 hover:bg-signal-red/20 text-signal-red font-semibold border border-signal-red/30 transition-colors"
                >
                  ✗ Invalid: ORB-2026-4821-3 (Wrong Check)
                </button>
                <button
                  onClick={() => {
                    const sampleInvalid2 = "ORB-2026-12345-6"; // 5 digits instead of 4
                    setVerifyInput(sampleInvalid2);
                    handleVerify(sampleInvalid2);
                  }}
                  className="px-2.5 py-1 rounded bg-signal-red/10 hover:bg-signal-red/20 text-signal-red font-semibold border border-signal-red/30 transition-colors"
                >
                  ✗ Bad Format: ORB-2026-12345-6
                </button>
              </div>
            </div>

            {/* Verification Result Card */}
            {verificationResult && verificationResult.tested && (
              <div
                className={`p-5 rounded-xl border transition-all ${
                  verificationResult.isValid
                    ? "bg-transit-teal/[0.07] border-transit-teal ring-1 ring-transit-teal/50"
                    : "bg-signal-red/[0.06] border-signal-red/50 ring-1 ring-signal-red/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      verificationResult.isValid
                        ? "bg-transit-teal text-white"
                        : "bg-signal-red text-white"
                    }`}
                  >
                    {verificationResult.isValid ? "✓" : "✕"}
                  </span>
                  <h5
                    className={`font-display font-bold text-base ${
                      verificationResult.isValid ? "text-transit-teal-dark" : "text-signal-red"
                    }`}
                  >
                    {verificationResult.isValid
                      ? "VALID CITIZEN ID NUMBER"
                      : "INVALID CITIZEN ID NUMBER"}
                  </h5>
                </div>

                <p className="text-xs font-mono text-slate mb-3 leading-relaxed">
                  {verificationResult.message}
                </p>

                {/* Mathematical Check breakdown */}
                {verificationResult.digits && (
                  <div className="bg-paper p-3 rounded-lg border border-line text-xs font-mono space-y-1">
                    <div className="text-[0.68rem] text-slate-light uppercase font-bold">
                      Verification Math Breakdown:
                    </div>
                    <div className="text-ink-navy">
                      • Tested ID: <span className="font-bold">{verificationResult.cleanId}</span>
                    </div>
                    <div className="text-ink-navy">
                      • Sum: {verificationResult.digits.split("").join(" + ")} ={" "}
                      <span className="font-bold">{verificationResult.sum}</span>
                    </div>
                    <div className="text-ink-navy">
                      • Calculated Checksum ({verificationResult.sum} mod 9):{" "}
                      <span className="font-bold text-transit-teal">
                        {verificationResult.expectedCheck}
                      </span>
                    </div>
                    <div className="text-ink-navy">
                      • Input Check Digit:{" "}
                      <span
                        className={`font-bold ${
                          verificationResult.isValid ? "text-transit-teal" : "text-signal-red"
                        }`}
                      >
                        {verificationResult.actualCheck}
                      </span>
                    </div>
                    <div
                      className={`pt-1 text-[0.72rem] font-bold ${
                        verificationResult.isValid ? "text-transit-teal-dark" : "text-signal-red"
                      }`}
                    >
                      {verificationResult.isValid
                        ? `✓ Match Verified (${verificationResult.actualCheck} === ${verificationResult.expectedCheck})`
                        : `✕ Mismatch Error (${verificationResult.actualCheck} !== ${verificationResult.expectedCheck})`}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-line text-[0.72rem] font-mono text-slate-light">
            Verified by Orbit Civic Identity Services (Govt. of India)
          </div>
        </div>
      </div>
    </div>
  );
}
