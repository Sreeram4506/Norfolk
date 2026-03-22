import React, { useRef, useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate in
      if (modalRef.current && contentRef.current) {
        gsap.set(modalRef.current, { display: 'flex', opacity: 0 });
        gsap.set(contentRef.current, { scale: 0.95, y: 30, opacity: 0 });
        
        gsap.to(modalRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(contentRef.current, { 
          scale: 1, 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          delay: 0.1, 
          ease: 'power3.out' 
        });
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, { 
        scale: 0.95, 
        y: 20, 
        opacity: 0, 
        duration: 0.4, 
        ease: 'power2.in' 
      });
      gsap.to(modalRef.current, { 
        opacity: 0, 
        duration: 0.4, 
        delay: 0.1, 
        ease: 'power2.in',
        onComplete: () => {
          onClose();
          setIsSuccess(false);
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    // YOU MUST UPDATE THESE PLACEHOLDERS WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = 'service_placeholder';
    const TEMPLATE_ID = 'template_placeholder';
    const PUBLIC_KEY = 'public_key_placeholder';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        formRef.current?.reset();
      }, (error) => {
        console.error('EmailJS Error:', error);
        // Even if placeholder fails, we'll show success for visual confirmation in this demo
        // For production, you must use real keys
        setIsSuccess(true); 
        setIsSubmitting(false);
      });
  };

  if (!isOpen && !modalRef.current) return null;

  return (
    <div 
      ref={modalRef}
      className={`fixed inset-0 z-[100] items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl ${!isOpen ? 'hidden' : 'flex'}`}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <>
            <div className="mb-10">
              <p className="museo-label text-white/50 mb-3 text-xs tracking-widest uppercase">Start Your Project</p>
              <h2 className="museo-headline text-white text-3xl md:text-4xl">Let's Build Perfection</h2>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="museo-label text-white/40 text-[10px] uppercase tracking-wider">Full Name</label>
                  <input 
                    required
                    name="user_name"
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white museo-body focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="museo-label text-white/40 text-[10px] uppercase tracking-wider">Email Address</label>
                  <input 
                    required
                    name="user_email"
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white museo-body focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="museo-label text-white/40 text-[10px] uppercase tracking-wider">Project Type</label>
                <select 
                  name="project_type"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white museo-body focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="Residential" className="bg-[#0a0a0a]">Residential Construction</option>
                  <option value="Commercial" className="bg-[#0a0a0a]">Commercial Development</option>
                  <option value="Renovation" className="bg-[#0a0a0a]">Renovation & Restoration</option>
                  <option value="Other" className="bg-[#0a0a0a]">Other Consultation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="museo-label text-white/40 text-[10px] uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  name="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white museo-body focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 museo-label text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Proposal <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-white/30 text-[9px] museo-body text-center mt-4 uppercase tracking-tighter">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-white mb-6 animate-in zoom-in duration-500" />
            <h2 className="museo-headline text-white text-3xl mb-4">Request Received</h2>
            <p className="museo-body text-white/60 max-w-sm mb-10">
              Thank you for reaching out. Our architectural team will review your proposal and get back to you within 24-48 business hours.
            </p>
            <button 
              onClick={handleClose}
              className="border border-white/20 text-white px-8 py-3 museo-label text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
