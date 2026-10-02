import { useState } from "react";
import { useForm } from "react-hook-form";
import { createRoot } from "react-dom/client";
import "./styles.css";

function LoginForm() {
  const [focusedField, setFocusedField] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const onSubmit = (values) => {
    console.log("Login form submission:", values);
  };

  return (
    <main className="login-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <section className="login-layout" aria-labelledby="login-title">
        <div className="brand-panel">
          <a className="wordmark" href="#top" aria-label="Fieldnotes home">
            <span className="wordmark-icon" aria-hidden="true">F</span>
            <span>fieldnotes</span>
          </a>
          <div className="brand-message">
            <p className="kicker">A place to begin again</p>
            <h1>Make room<br />for what<br /><em>matters.</em></h1>
            <p className="brand-caption">Your next chapter starts with a quieter kind of focus.</p>
          </div>
          <p className="brand-footnote">01 <span /> Your space, your pace</p>
        </div>

        <div className="form-panel" id="top">
          <div className="form-heading">
            <p className="kicker">Welcome back</p>
            <h2 id="login-title">Sign in to your account</h2>
            <p>Enter your details below to continue.</p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
            onFocusCapture={(event) => setFocusedField(event.target.id)}
            onBlurCapture={() => setFocusedField("")}
            noValidate
          >
            <div className={`field-group ${focusedField === "username" ? "is-focused" : ""}`}>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? "username-error" : undefined}
                className={`block w-full rounded-lg border bg-gray-50 p-3 text-sm text-gray-900 focus:border-emerald-700 focus:ring-emerald-700 ${errors.username ? "border-red-500" : "border-gray-300"}`}
                placeholder="Your username"
                {...register("username", {
                  required: "Please enter your username.",
                  minLength: { value: 3, message: "Username must be at least 3 characters." },
                })}
              />
              {errors.username && <p className="field-error" id="username-error" role="alert">{errors.username.message}</p>}
            </div>

            <div className={`field-group ${focusedField === "email" ? "is-focused" : ""}`}>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`block w-full rounded-lg border bg-gray-50 p-3 text-sm text-gray-900 focus:border-emerald-700 focus:ring-emerald-700 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Please enter your email address.",
                  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address.",
                })}
              />
              {errors.email && <p className="field-error" id="email-error" role="alert">{errors.email.message}</p>}
            </div>

            <div className={`field-group ${focusedField === "password" ? "is-focused" : ""}`}>
              <div className="password-heading">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">Password</label>
                {isSubmitted && !errors.password && <span className="password-hint">Looks good</span>}
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`block w-full rounded-lg border bg-gray-50 p-3 text-sm text-gray-900 focus:border-emerald-700 focus:ring-emerald-700 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Please enter your password.",
                  validate: (value) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) || "Use at least 8 characters with a letter and a number.",
                })}
              />
              {errors.password && <p className="field-error" id="password-error" role="alert">{errors.password.message}</p>}
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-emerald-700 focus:ring-emerald-600" />
                <span>Remember me</span>
              </label>
              <a href="#forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="submit-button w-full rounded-lg bg-emerald-800 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200">
              Sign in <span aria-hidden="true">&#8599;</span>
            </button>
          </form>

          <p className="signup-prompt">New around here? <a href="#create-account">Create an account</a></p>
          <p className="privacy-note">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<LoginForm />);