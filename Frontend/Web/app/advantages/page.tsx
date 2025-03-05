export default function AdvantagesPage(){

    return (
        <div className="min-h-screen bg-[#FFF3E0] py-24">
            <div className="mx-auto max-w-7xl px-4">
               <div className="rounded-3xl bg-[#F8E3C5] p-12 shadow-lg">
                  <div className="grid gap-16 lg:grid-cols-3">
                               {/* Left Column - Title */}
                      <div>
                        <h1 className="text-5xl font-bold leading-tight">
                           Benefits we
                                            <br />
                            provide
                        </h1>
                      </div>
                    </div>

                    {/* Right Column - Benefits Grid */}
                 <div className="grid gap-12 lg:col-span-2">
                      <div className="grid gap-12 md:grid-cols-2">
                                {/* Overpricing & Scams */}
                          <div>
                                 <h2 className="mb-4 text-3xl font-medium">Overpricing & scams</h2>
                                <p className="text-gray-700">
                                        Being a tourist often means paying more and being targeted by scams. From "special tourist prices"
                                        to classic tourist traps, it's frustrating to discover you've paid double what locals pay. Let us
                                        help you spend wisely and avoid common scams!
                                </p>
                             </div>


                                {/* Transportation */}
                             <div>
                                     <h2 className="mb-4 text-3xl font-medium">Transportation</h2>
                                     <p className="text-gray-700">
                                     Confused about metro cards? Unsure which ticket to buy? Struggling with route maps? Transportation
                                     in a new city can be overwhelming and time-consuming. Let us help you skip the confusion and
                                     navigate efficiently from day one!
                                     </p>
                            </div>
                        </div>

                        
    )
}