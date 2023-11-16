
 let prevX = null;
    let prevY = null;
    let velocity = 0;

    // Create a synth
    const synth = new Tone.Synth({ volume: -10 }).toDestination();

    function calculateVelocity() {
      const x = event.clientX;
      const y = event.clientY;

      if (prevX !== null && prevY !== null) {
        const distance = Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2);
        velocity = distance / 1; // 1 second

        // Map velocity to pitch range (adjust as needed)
        const pitch = Tone.Frequency(50 + velocity * 10, "midi");

        // Trigger the synth with the calculated pitch
        synth.triggerAttackRelease(pitch, 0.1);
      }

      prevX = x;
      prevY = y;
    }

    setInterval(() => {
      console.log(`Velocity: ${velocity.toFixed(2)} pixels per second`);
      velocity = 0; // Reset velocity every second
    }, 1000);

    document.addEventListener('mousemove', calculateVelocity);

    // Add event listener to the button
    document.getElementById('startButton').addEventListener('click', async () => {
      await Tone.start();
      console.log('Tone.js is ready to play sounds');
    });