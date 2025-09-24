        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-soft">
            <span className="text-[#00B67A] font-semibold text-lg sm:text-xl">
              Great
            </span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="https://images-static.trustpilot.com/api/stars/4/star.svg"
                  alt="Trustpilot star"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              ))}
            </div>
            <span className="text-[#00B67A] text-sm sm:text-base font-medium">
              30,207 reviews on ★ Trustpilot
            </span>
          </div>
        </div>
