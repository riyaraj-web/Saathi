const cron = require('node-cron')
const nodemailer = require('nodemailer')
const User = require('../models/User')

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Check medicine reminders every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // Find users with medicines scheduled for this time
    const users = await User.find({
      'medicines.times': currentTime,
      notificationsEnabled: true
    })

    for (const user of users) {
      const dueMedicines = user.medicines.filter(med => 
        med.times.includes(currentTime)
      )

      if (dueMedicines.length > 0 && user.email) {
        // Send email reminder
        const medicineList = dueMedicines.map(m => 
          `${m.name} - ${m.dosage}${m.withFood ? ' (with food)' : ''}`
        ).join('\n')

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: '⏰ Medicine Reminder from Saathi',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f0701f;">Hello ${user.name}!</h2>
              <p style="font-size: 18px;">It's time to take your medicine:</p>
              <div style="background: #fef6ee; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <pre style="font-size: 16px; margin: 0;">${medicineList}</pre>
              </div>
              <p style="font-size: 16px;">Remember to mark it as taken in the app!</p>
              <p style="color: #666;">With care,<br>Your Saathi Team</p>
            </div>
          `
        })

        console.log(`Reminder sent to ${user.name} for ${dueMedicines.length} medicine(s)`)
      }
    }
  } catch (error) {
    console.error('Reminder service error:', error)
  }
})

// Daily social health check reminder (9 AM)
cron.schedule('0 9 * * *', async () => {
  try {
    const users = await User.find({ notificationsEnabled: true })

    for (const user of users) {
      if (user.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: '🌅 Good Morning! Daily Check-in Reminder',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f0701f;">Good Morning, ${user.name}!</h2>
              <p style="font-size: 18px;">How are you feeling today?</p>
              <p style="font-size: 16px;">Take a moment to complete your daily check-in and track your social wellness.</p>
              <a href="${process.env.NEXT_PUBLIC_API_URL}/checkin" 
                 style="display: inline-block; background: #f0701f; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 10px; font-size: 18px; margin: 20px 0;">
                Complete Check-in
              </a>
              <p style="color: #666;">With care,<br>Your Saathi Team</p>
            </div>
          `
        })
      }
    }

    console.log('Daily check-in reminders sent')
  } catch (error) {
    console.error('Daily reminder error:', error)
  }
})

module.exports = { transporter }
