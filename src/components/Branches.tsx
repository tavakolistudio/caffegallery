"use client"

import { siteData } from "@/data/site"

type Branch = (typeof siteData.branches)[number]

const labels = {
  fa: {
    address: "آدرس",
    phone: "شماره تماس",
    hours: "ساعت کاری",
    call: "تماس",
    map: "مسیریابی",
    detailsPending: "اطلاعات تکمیلی این شعبه در حال تکمیل است",
    mapComingSoon: "لینک نقشه به‌زودی اضافه می‌شود",
  },
  en: {
    address: "Address",
    phone: "Phone",
    hours: "Working Hours",
    call: "Call",
    map: "Directions",
    detailsPending: "Additional branch details are being completed",
    mapComingSoon: "Map link coming soon",
  },
}

function BranchCard({ branch, lang }: { branch: Branch; lang: "fa" | "en" }) {
  const l = labels[lang]
  const isRtl = lang === "fa"

  const name = lang === "fa" ? branch.nameFa : branch.nameEn
  const type = lang === "fa" ? branch.typeFa : branch.typeEn
  const address = lang === "fa" ? branch.addressFa : branch.addressEn
  const phone = lang === "fa" ? branch.phoneFa : branch.phone
  const phoneLabel = lang === "fa" ? branch.phoneLabelFa : branch.phoneLabelEn
  const hours = lang === "fa" ? branch.hoursFa : branch.hoursEn
  const features = lang === "fa" ? branch.featuresFa : branch.featuresEn
  const note = lang === "fa" ? branch.noteFa : branch.noteEn

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="w-full h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={branch.image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = "none"
          }}
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Name & type */}
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-snug">{name}</h3>
          <span className="inline-block mt-1.5 px-3 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
            {type}
          </span>
        </div>

        {/* Address */}
        <div className="flex gap-2 text-sm text-gray-700 items-start">
          <span className="font-semibold text-gray-400 shrink-0">{l.address}:</span>
          <span>{address}</span>
        </div>

        {/* Phone */}
        <div className="flex gap-2 text-sm text-gray-700 items-center flex-wrap">
          <span className="font-semibold text-gray-400 shrink-0">{l.phone}:</span>
          <span dir="ltr">{phone}</span>
          <span className="text-xs text-gray-400">({phoneLabel})</span>
        </div>

        {/* Hours */}
        <div className="flex gap-2 text-sm items-center">
          <span className="font-semibold text-gray-400 shrink-0">{l.hours}:</span>
          <span className="text-amber-500">{hours}</span>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {features.map((f, i) => (
              <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        {note && (
          <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
            ⚠ {note}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <a
            href={`tel:${branch.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            📞 {l.call}
          </a>

          {branch.mapUrl ? (
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🗺 {l.map}
            </a>
          ) : (
            <button
              disabled
              title={l.mapComingSoon}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-100 text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
            >
              🗺 {l.map}
            </button>
          )}
        </div>

        {/* Map coming soon hint */}
        {!branch.mapUrl && (
          <p className="text-center text-xs text-gray-400 -mt-1">{l.mapComingSoon}</p>
        )}
      </div>
    </div>
  )
}

export default function Branches({ lang = "fa" }: { lang?: "fa" | "en" }) {
  return (
    <section
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteData.branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} lang={lang} />
        ))}
      </div>
    </section>
  )
}
