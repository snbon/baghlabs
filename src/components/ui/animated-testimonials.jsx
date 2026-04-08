import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function AnimatedTestimonials({
  title = "Wat klanten zeggen",
  subtitle = "Bekijk wat onze klanten zeggen over samenwerken met Baghlabs.",
  badgeText = "Klantbeoordelingen",
  testimonials = [],
  autoRotateInterval = 6000,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)
    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) return null

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Left: heading + navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-5">
              {badgeText && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bagh-50 text-bagh-700 border border-bagh-100">
                  <Star className="h-3 w-3 fill-bagh-500 text-bagh-500" />
                  {badgeText}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">{title}</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-sm">{subtitle}</p>
              <div className="flex items-center gap-2 pt-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-8 bg-foreground" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: testimonial cards */}
          <motion.div variants={itemVariants} className="relative min-h-[280px] md:min-h-[320px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 60 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 60,
                  scale: activeIndex === index ? 1 : 0.96,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="bg-white/60 backdrop-blur-sm border border-bagh-100/60 rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="relative mb-5 flex-1">
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-bagh-200 rotate-180" />
                    <p className="relative z-10 text-base leading-relaxed text-foreground pl-3">"{testimonial.content}"</p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-bagh-100">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-bagh-50 text-bagh-700 text-sm">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
