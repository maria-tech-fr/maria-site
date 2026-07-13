'use client'

import Link from 'next/link'
import { useActionState, useId } from 'react'
import HaloField from '../HaloField'
import Reveal from '../Reveal'
import { submitContact } from '../../lib/contactActions'
import type { ContactSubmitState } from '../../lib/contactSchema'

type ContactFormProps = {
  surTitre: string
  titre: string
  sousTitre?: string | null
  rgpdMention?: string | null
  submitLabel?: string | null
  submitMeta?: string | null
}

const initialState: ContactSubmitState = { status: 'idle' }

export default function ContactForm({
  surTitre,
  titre,
  sousTitre,
  rgpdMention,
  submitLabel,
  submitMeta,
}: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialState)
  const errors = state.status === 'error' ? state.fieldErrors : undefined
  // En cas d'erreur, on conserve les valeurs saisies pour ré-hydrater le
  // formulaire. Le hook useActionState ne renvoie pas le formData ; le serveur
  // nous retourne explicitement `values` dans l'état d'erreur.
  const values = state.status === 'error' ? state.values : undefined
  const nomId = useId()
  const prenomId = useId()
  const telId = useId()
  const emailId = useId()
  const msgId = useId()
  const rgpdId = useId()
  const errId = useId()

  return (
    <section
      id="formulaire"
      className="relative overflow-hidden bg-paper px-6 py-16 lg:px-30.5 lg:py-22.5"
    >
      <HaloField
        halos={[
          { color: '#3FC163', alpha: 0.16, x: '8%', y: '40%', size: 520, blur: 50, duration: 38 },
          { color: '#FEC23C', alpha: 0.14, x: '92%', y: '85%', size: 520, blur: 50, duration: 42 },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-[720px] flex-col gap-14">
        <Reveal>
          <div className="flex flex-col gap-4.5">
            <p className="font-mono text-[12px] leading-[18.6px] tracking-[0.06em] text-success">
              {surTitre}
            </p>
            <h2 className="font-display text-[36px] font-semibold leading-10 tracking-[-0.032em] text-ink lg:text-[60px] lg:leading-[62px]">
              {titre}
            </h2>
            {sousTitre && (
              <p className="text-[16px] leading-7 text-ink-soft lg:text-[18px] lg:leading-[27.9px]">
                {sousTitre}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form action={formAction} noValidate className="flex flex-col gap-5">
            {/* Champ honeypot — caché aux humains, lu par les bots */}
            <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={`${errId}-website`}>
                Ne pas remplir
                <input
                  id={`${errId}-website`}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id={prenomId}
                name="prenom"
                label="prénom"
                required
                error={errors?.prenom}
                placeholder="Claire"
                defaultValue={values?.prenom}
              />
              <Field
                id={nomId}
                name="nom"
                label="nom"
                required
                error={errors?.nom}
                placeholder="Dupont"
                defaultValue={values?.nom}
              />
            </div>

            <Field
              id={telId}
              name="telephone"
              type="tel"
              label="téléphone"
              optional
              error={errors?.telephone}
              placeholder="06 12 34 56 78"
              defaultValue={values?.telephone}
            />

            <Field
              id={emailId}
              name="email"
              type="email"
              label="email"
              required
              error={errors?.email}
              placeholder="claire.dupont@entreprise.com"
              defaultValue={values?.email}
            />

            <FieldTextarea
              id={msgId}
              name="message"
              label="votre message"
              required
              error={errors?.message}
              placeholder="Dites-nous en quelques lignes ce que vous cherchez à faire, même de façon vague."
              defaultValue={values?.message}
            />

            <div className="flex items-start gap-3 pt-1">
              <input
                id={rgpdId}
                name="rgpdConsent"
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={errors?.rgpdConsent ? 'true' : undefined}
                aria-describedby={errors?.rgpdConsent ? `${rgpdId}-err` : undefined}
                defaultChecked={values?.rgpdConsent ?? false}
                className="mt-1 h-4 w-4 flex-none accent-success"
              />
              <label htmlFor={rgpdId} className="text-[13px] leading-[19.5px] text-ink-soft">
                {rgpdMention || "J'accepte que mes données soient utilisées par maria pour répondre à ma demande, dans le respect de la"}{' '}
                <Link
                  href="/confidentialite"
                  className="border-b border-success font-medium text-ink hover:text-success"
                >
                  politique de confidentialité
                </Link>
                .<span className="text-accent"> *</span>
              </label>
            </div>
            {errors?.rgpdConsent && (
              <p id={`${rgpdId}-err`} className="font-mono text-[11px] uppercase tracking-[0.08em] text-red-500">
                {errors.rgpdConsent}
              </p>
            )}

            {state.status === 'error' && state.message && (
              <p
                role="alert"
                className="rounded-[5px] border border-red-300 bg-red-50 px-4 py-3 text-[14px] leading-5 text-red-700"
              >
                {state.message}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#999]">
                {submitMeta || 'RÉPONSE SOUS 24 H · HORS WEEK-END'}
              </p>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-7 py-3.5 font-medium text-[15px] leading-5 text-paper transition-colors duration-300 ease-out hover:bg-ink-soft disabled:cursor-wait disabled:opacity-60"
              >
                {pending ? 'Envoi…' : submitLabel || 'Envoyer'}
                {!pending && <ArrowRight />}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  optional,
  error,
  placeholder,
  defaultValue,
}: {
  id: string
  name: string
  label: string
  type?: string
  required?: boolean
  optional?: boolean
  error?: string
  placeholder?: string
  defaultValue?: string
}) {
  const errId = `${id}-err`
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline gap-1.5 font-mono text-[11px] leading-4 lowercase tracking-[0.08em] text-ink-soft"
      >
        <span>{label}</span>
        {required && <span className="text-accent">*</span>}
        {optional && (
          <span className="font-mono text-[10px] lowercase tracking-[0.06em] text-[#999]">
            optionnel
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full rounded-lg border bg-paper px-4 py-3.5 text-[16px] leading-6 text-ink placeholder:text-[#C5C5C5] focus:outline-none focus:ring-2 focus:ring-success/30 ${
          error ? 'border-red-400' : 'border-[#D8D8D8] focus:border-success'
        }`}
      />
      {error && (
        <p id={errId} className="font-mono text-[11px] uppercase tracking-[0.08em] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function FieldTextarea({
  id,
  name,
  label,
  required,
  error,
  placeholder,
  defaultValue,
}: {
  id: string
  name: string
  label: string
  required?: boolean
  error?: string
  placeholder?: string
  defaultValue?: string
}) {
  const errId = `${id}-err`
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline gap-1.5 font-mono text-[11px] leading-4 lowercase tracking-[0.08em] text-ink-soft"
      >
        <span>{label}</span>
        {required && <span className="text-accent">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={6}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full resize-y rounded-lg border bg-paper px-4 py-3.5 text-[16px] leading-6 text-ink placeholder:text-[#C5C5C5] focus:outline-none focus:ring-2 focus:ring-success/30 ${
          error ? 'border-red-400' : 'border-[#D8D8D8] focus:border-success'
        }`}
      />
      {error && (
        <p id={errId} className="font-mono text-[11px] uppercase tracking-[0.08em] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <path
        d="M1 6h13M9 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
