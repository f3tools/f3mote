// One-shot: replace "agent" (host program) with "f3mote host" in non-en web locales.
// Keeps existing translations, only swaps the agent-word for the untranslated brand.
// Keys: updateAvailableTitle, approvalDescription, rejectedDescription.
// Run: node scripts/fixAgentText.mjs
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES_DIR = join(ROOT, "web", "shared", "i18n", "locales");

// Brand "f3mote host" stays untranslated in every locale.
const UPDATES = {
  ar: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "يحتاج f3mote host إلى الموافقة على هذا الجهاز قبل أن تتمكن من الاتصال.",
    rejectedDescription: "لم يتم اعتماد هذا الجهاز من قبل f3mote host.",
  },
  de: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "Der f3mote host muss dieses Gerät genehmigen, bevor Sie sich verbinden können.",
    rejectedDescription: "Dieses Gerät wurde vom f3mote host nicht genehmigt.",
  },
  es: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "El f3mote host debe aprobar este dispositivo antes de poder conectarte.",
    rejectedDescription: "Este dispositivo no fue aprobado por el f3mote host.",
  },
  fa: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host باید این دستگاه را قبل از اتصال شما تأیید کند.",
    rejectedDescription: "این دستگاه توسط f3mote host تأیید نشد.",
  },
  fr: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "Le f3mote host doit approuver cet appareil avant que vous puissiez vous connecter.",
    rejectedDescription: "Cet appareil n'a pas été approuvé par le f3mote host.",
  },
  he: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host צריך לאשר מכשיר זה לפני שתוכל להתחבר.",
    rejectedDescription: "מכשיר זה לא אושר על ידי f3mote host.",
  },
  hi: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "आप कनेक्ट करने से पहले f3mote host को इस डिवाइस को अनुमोदित करना होगा।",
    rejectedDescription: "इस डिवाइस को f3mote host द्वारा अनुमोदित नहीं किया गया।",
  },
  id: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host perlu menyetujui perangkat ini sebelum Anda dapat terhubung.",
    rejectedDescription: "Perangkat ini tidak disetujui oleh f3mote host.",
  },
  it: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "Il f3mote host deve approvare questo dispositivo prima che tu possa connetterti.",
    rejectedDescription: "Questo dispositivo non è stato approvato dal f3mote host.",
  },
  ja: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "接続する前に f3mote host がこのデバイスを承認する必要があります。",
    rejectedDescription: "このデバイスは f3mote host によって承認されませんでした。",
  },
  ko: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "연결하기 전에 f3mote host가 이 기기를 승인해야 합니다.",
    rejectedDescription: "이 기기는 f3mote host에 의해 승인되지 않았습니다.",
  },
  ms: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host perlu meluluskan peranti ini sebelum anda boleh menyambung.",
    rejectedDescription: "Peranti ini tidak diluluskan oleh f3mote host.",
  },
  nl: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "De f3mote host moet dit apparaat goedkeuren voordat u verbinding kunt maken.",
    rejectedDescription: "Dit apparaat is niet goedgekeurd door de f3mote host.",
  },
  pl: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host musi zatwierdzić to urządzenie, zanim się połączysz.",
    rejectedDescription: "To urządzenie nie zostało zatwierdzone przez f3mote host.",
  },
  pt: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "O f3mote host precisa aprovar este dispositivo antes que você possa se conectar.",
    rejectedDescription: "Este dispositivo não foi aprovado pelo f3mote host.",
  },
  ru: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host должен подтвердить это устройство, прежде чем вы сможете подключиться.",
    rejectedDescription: "Это устройство не было подтверждено f3mote host.",
  },
  sv: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host måste godkänna den här enheten innan du kan ansluta.",
    rejectedDescription: "Den här enheten godkändes inte av f3mote host.",
  },
  th: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host ต้องอนุมัติอุปกรณ์นี้ก่อนคุณจึงจะเชื่อมต่อได้",
    rejectedDescription: "อุปกรณ์นี้ไม่ได้รับการอนุมัติจาก f3mote host",
  },
  tr: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "Bağlanmadan önce f3mote host'in bu cihazı onaylaması gerekiyor.",
    rejectedDescription: "Bu cihaz f3mote host tarafından onaylanmadı.",
  },
  uk: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "f3mote host повинен схвалити цей пристрій, перш ніж ви зможете підключитися.",
    rejectedDescription: "Цей пристрій не був схвалений f3mote host.",
  },
  vi: {
    updateAvailableTitle: "Có bản cập nhật f3mote host",
    approvalDescription: "f3mote host cần phê duyệt thiết bị này trước khi bạn có thể kết nối.",
    rejectedDescription: "Thiết bị này không được f3mote host phê duyệt.",
  },
  zh: {
    updateAvailableTitle: "f3mote host update available",
    approvalDescription: "在您连接之前，f3mote host 需要批准此设备。",
    rejectedDescription: "此设备未被 f3mote host 批准。",
  },
};

const files = readdirSync(LOCALES_DIR).filter(
  (f) => f.endsWith(".js") && f !== "index.js" && f !== "en.js"
);

let total = 0;
for (const file of files) {
  const code = file.replace(".js", "");
  const updates = UPDATES[code];
  if (!updates) {
    console.warn(`⚠ ${file}: no updates defined, skipped`);
    continue;
  }
  const path = join(LOCALES_DIR, file);
  let content = readFileSync(path, "utf8");
  let changed = 0;
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`(${key}:\\s*")[^"]*(")`);
    if (!re.test(content)) {
      console.warn(`⚠ ${file}: key "${key}" not found`);
      continue;
    }
    content = content.replace(re, (_m, p1, p2) => `${p1}${value}${p2}`);
    changed++;
  }
  writeFileSync(path, content);
  console.log(`✓ ${file}: ${changed} key(s)`);
  total += changed;
}
console.log(`Done. ${total} keys across ${files.length} locales.`);
