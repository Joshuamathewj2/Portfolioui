import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Connectivity // Sync Node</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#4F46E5] to-transparent" />
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Initialize Connection</h2>
          <p className="text-[#A1A1AA] mt-4 text-lg font-inter">
            Open for strategic collaborations and high-impact engineering roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-syne mb-6">Get in Touch</h3>
              <p className="text-[#A1A1AA] leading-relaxed mb-8">
                I'm currently seeking opportunities in backend engineering, AI systems development,
                and full-stack roles. If you're building something innovative, let's connect.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'joshuamathewj2@gmail.com', href: 'mailto:joshuamathewj2@gmail.com' },
                { icon: Github, label: 'GitHub', value: 'Joshuamathewj2', href: 'https://github.com/Joshuamathewj2' },
                { icon: Linkedin, label: 'LinkedIn', value: 'joshua-learns', href: 'https://www.linkedin.com/in/joshua-learns' },
                { icon: MapPin, label: 'Location', value: 'Chennai, India', href: null },
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 glass-effect rounded-lg flex items-center justify-center group-hover:border-[#4F46E5] transition-colors">
                    <contact.icon className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#71717A]">{contact.label}</div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[#F5F5F5] hover:text-[#4F46E5] transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-[#F5F5F5]">{contact.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-xl font-syne mb-6">Send a Message</h3>

            <form className="space-y-6">
              <div>
                <label className="block text-sm text-[#A1A1AA] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#0B0B0F] border border-[#27272A] rounded-lg text-[#F5F5F5] placeholder-[#71717A] focus:border-[#4F46E5] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A1A1AA] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-[#0B0B0F] border border-[#27272A] rounded-lg text-[#F5F5F5] placeholder-[#71717A] focus:border-[#4F46E5] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A1A1AA] mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-[#0B0B0F] border border-[#27272A] rounded-lg text-[#F5F5F5] placeholder-[#71717A] focus:border-[#4F46E5] focus:outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-[#4F46E5] text-white rounded-lg font-inter flex items-center justify-center gap-2 hover:bg-[#7C3AED] transition-colors glow-border"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[#A1A1AA]">Available for new opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
