# Connect the quote form to GoHighLevel

The quote form on `/contact` posts to a Netlify Function that forwards the
payload to a single GoHighLevel **Inbound Webhook**. The webhook lives inside a
GHL Workflow, which is responsible for creating the contact AND texting Josiah.

You set this up once. After that, you can change the automation behavior
(notification text, follow-up emails, tagging, pipeline assignment) entirely
in the GHL UI — no code changes.

## What you'll do

1. Create the workflow in GHL with an Inbound Webhook trigger.
2. Copy the webhook URL.
3. Paste it into Netlify as the `GHL_INBOUND_WEBHOOK_URL` environment variable.
4. Redeploy.

That's it.

---

## Step 1 — Create the workflow in GHL

1. Log into GHL. Make sure you're in the correct **Location** (Location ID
   `tlHhUo40JX0SwVD1xPZ2`).
2. Sidebar → **Automation** → **Workflows** → **+ Create Workflow** → **Start from scratch**.
3. Name it something like **"Website Quote Request"**.

### Add the trigger

4. Click **Add New Workflow Trigger** → search for and select **Inbound Webhook**.
5. Click **Save Trigger**.
6. A **Webhook URL** will appear. **Copy this URL** — you'll need it in Step 3.

### Map the incoming fields (so contacts get created with real data)

The site sends these field names. Map them to standard GHL contact fields:

| Webhook field | Map to GHL field |
|---|---|
| `firstName`   | First Name      |
| `lastName`    | Last Name       |
| `phone`       | Phone           |
| `email`       | Email           |
| `address`     | Address Line 1  |
| `footage`     | Custom field — "Approximate Footage" (text) |
| `stories`     | Custom field — "Stories" (text) |
| `timing`      | Custom field — "Install Timing" (text) |
| `notes`       | Custom field — "Quote Notes" (long text) |
| `source`      | Lead Source — value will be `quote_request` |
| `submittedAt` | (optional) Custom field "Submitted At" |

> **Create the custom fields first** if they don't exist:
> Settings → Custom Fields → New → for each of "Approximate Footage", "Stories",
> "Install Timing", "Quote Notes".

### Add the workflow actions

7. **Create/Update Contact** action — use the mapped fields above. This is what
   actually creates the contact in your CRM.
8. **Send Internal Notification → SMS** action — send to your own number
   (402-889-8640). Suggested body:

   ```
   New quote request 🔥
   {{contact.first_name}} {{contact.last_name}}
   {{contact.phone}}
   {{contact.email}}
   {{contact.address_line1}}
   Footage: {{custom_values.approximate_footage}}
   Stories: {{custom_values.stories}}
   Timing: {{custom_values.install_timing}}
   Notes: {{custom_values.quote_notes}}
   ```

   (Adjust the template names to match what GHL shows for the custom fields
   you created.)

9. (Optional but recommended) Add a **Send Email** action to confirm to the
   homeowner that their request was received.
10. **Save** and **Publish** the workflow.

---

## Step 2 — Wire the URL into Netlify

In Netlify (after the site is deployed):

1. Site settings → **Environment variables** → **Add a variable**.
2. Key: `GHL_INBOUND_WEBHOOK_URL`
3. Value: paste the webhook URL from Step 1.
4. Scope: **All scopes** (or at minimum Production + Branch Deploys).
5. **Trigger a redeploy** (Deploys → Trigger deploy → Deploy site). Env-var
   changes don't take effect on running functions until the next deploy.

---

## Step 3 — Test it

1. Go to `https://your-site.netlify.app/contact` (or wherever you've deployed).
2. Fill in the form with real-but-test data (your own name, phone, email).
3. Submit.
4. Within seconds you should:
   - See "Quote request sent." in the browser.
   - See the contact appear in GHL → Contacts.
   - Get a text message at your phone.

### If it doesn't work

In Netlify, go to **Functions → submit-quote → Logs** and look for:

- `GHL_INBOUND_WEBHOOK_URL not set` → the env var wasn't added or you didn't
  redeploy after adding it.
- `GHL webhook returned non-2xx` → the workflow isn't published, or the URL is
  wrong. Re-copy the URL from the trigger.
- `network error reaching GHL` → temporary GHL outage; retry.

---

## Local dev

For development (`npm run dev`):

- The form still posts to `/.netlify/functions/submit-quote`. A Vite middleware
  runs the same handler the production function uses, so dev works without
  installing `netlify-cli`.
- If `GHL_INBOUND_WEBHOOK_URL` is **not** set locally, submissions will succeed
  but won't be forwarded to GHL — the payload is logged to the terminal
  instead. This lets you test the UI without polluting your live CRM.
- If you want to test the real GHL flow locally, create a `.env.local` file
  in the project root (it's gitignored) with:

  ```
  GHL_INBOUND_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
  ```

  Vite picks up `.env*` automatically. Restart `npm run dev` after creating it.
