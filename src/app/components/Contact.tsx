import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MapPin, Send, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  // No backend: hand the message to the visitor's mail client, pre-filled.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name}`;
    const body = `${form.message}

— ${form.name}
${form.email}`;
    window.location.href = `mailto:joshuamathewj2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setSent(false);
    };

  const copyEmail = () => {
    navigator.clipboard.writeText('joshuamathewj2@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#4F46E5_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[#050505] mix-blend-overlay" />
        <div className="absolute inset-0 diagonal-stripes opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          
          {/* Left Side: Copy Card & Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="text-[#10B981] font-mono text-[10px] tracking-widest uppercase font-bold">Status // Open to Internships</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Get in touch</h2>
              <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-md font-inter">
                Looking for a specialized intern to bridge AI and security? Let's discuss how I can contribute to your production workflows.
              </p>
            </motion.div>

            {/* Email Copy Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={copyEmail}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] to-[#38BDF8] rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-10 bg-[#0A0A0E] rounded-xl border border-[#27272A] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-[#16161D] rounded-full border border-[#27272A] group-hover:border-[#4F46E5]/50 transition-colors">
                  <Mail className="w-8 h-8 text-[#4F46E5]" />
                </div>
                <div>
                  <div className="text-[#71717A] font-mono text-[10px] tracking-widest uppercase mb-1">Direct Contact</div>
                  <div className="text-2xl font-bold text-white tracking-tight break-all">joshuamathewj2@gmail.com</div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[#38BDF8] font-mono text-[10px] uppercase tracking-widest min-h-[32px] justify-center w-full">
                  {copied ? (
                    <span className="flex items-center gap-2">COPIED_TO_CLIPBOARD <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full animate-ping" /></span>
                  ) : (
                    "Click to copy email ID"
                  )}
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-6">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/Joshuamathewj2' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/joshua-learns' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-6 bg-[#0D0D12] border border-[#27272A] rounded-lg text-[#A1A1AA] hover:text-white hover:border-[#4F46E5]/40 transition-all font-mono text-xs font-bold uppercase tracking-widest"
                >
                  <link.icon className="w-4 h-4 text-[#4F46E5]" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 bg-[#0D0D12] border border-[#27272A] rounded-2xl relative"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest ml-1">Protocol // Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Identify yourself..."
                    className="w-full bg-[#050505] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F46E5] focus:shadow-[0_0_0_4px_rgba(79,70,229,0.15)] placeholder:text-[#3F3F46] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest ml-1">Endpoint // Email</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="your@email.com"
                    className="w-full bg-[#050505] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F46E5] focus:shadow-[0_0_0_4px_rgba(79,70,229,0.15)] placeholder:text-[#3F3F46] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest ml-1">Payload // Message</label>
                <textarea 
                  id="contact-message"
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="How can we build together?"
                  rows={6}
                  className="w-full bg-[#050505] border border-[#27272A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F46E5] focus:shadow-[0_0_0_4px_rgba(79,70,229,0.15)] placeholder:text-[#3F3F46] transition-all resize-none"
                />
              </div>
              <button 
                type="submit"
                className="group relative overflow-hidden w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:text-white transition-colors duration-500 rounded-full"
              >
                <span className="absolute inset-0 bg-[#4F46E5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative">EXECUTE_MESSAGE_SEND</span>
              </button>
              <p aria-live="polite" className="min-h-[1rem] text-center font-mono text-[10px] tracking-widest uppercase text-[#10B981]">
                {sent ? 'Mail client opened // message drafted' : ''}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
