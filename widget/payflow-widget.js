(function(window) {
    const API_BASE_URL = 'http://localhost:3000/api'; // Change for production

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #payflow-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.7); z-index: 9999;
                display: flex; justify-content: center; align-items: center;
                backdrop-filter: blur(8px); font-family: 'Inter', sans-serif;
                opacity: 0; transition: opacity 0.3s ease;
            }
            #payflow-modal-overlay.visible { opacity: 1; }
            #payflow-modal {
                background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f1f5f9;
                width: 90%; max-width: 420px; padding: 28px;
                border-radius: 16px; box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.5), 0 0 40px rgba(37, 99, 235, 0.2);
                border: 1px solid rgba(37, 99, 235, 0.2);
                transform: scale(0.95); transition: transform 0.3s ease;
            }
            #payflow-modal-overlay.visible #payflow-modal { transform: scale(1); }
            .pf-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
            .pf-title { font-size: 1.25rem; font-weight: 600; color: #ffffff; }
            .pf-close { cursor: pointer; color: #94a3b8; font-size: 1.5rem; transition: color 0.2s; }
            .pf-close:hover { color: #e2e8f0; }
            .pf-amount { font-size: 2.5rem; font-weight: 700; margin-bottom: 24px; text-align: center; background: linear-gradient(to right, #3b82f6, #0ea5e9); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
            .pf-input-group { margin-bottom: 20px; }
            .pf-label { display: block; margin-bottom: 8px; color: #cbd5e1; font-size: 0.875rem; font-weight: 500; }
            .pf-input {
                width: 100%; padding: 12px 14px; border-radius: 10px;
                border: 1px solid #334155; background: #0f172a; color: white;
                font-size: 1rem; outline: none; transition: all 0.2s;
            }
            .pf-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
            .pf-btn {
                width: 100%; padding: 14px; border-radius: 10px;
                background: linear-gradient(to right, #2563eb, #1d4ed8); color: white; font-weight: 600;
                border: none; cursor: pointer; transition: all 0.2s;
                display: flex; justify-content: center; align-items: center; box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
            }
            .pf-btn:hover { background: linear-gradient(to right, #1d4ed8, #1e40af); box-shadow: 0 0 30px rgba(37, 99, 235, 0.5); }
            .pf-btn:disabled { background: #475569; cursor: not-allowed; }
            .pf-error { color: #f87171; font-size: 0.875rem; margin-top: 8px; display: none; font-weight: 500; }
            .pf-success { color: #22c55e; text-align: center; display: none; }
            .pf-spinner {
                border: 3px solid rgba(255,255,255,0.3); border-radius: 50%;
                border-top: 3px solid #fff; width: 20px; height: 20px;
                animation: pf-spin 1s linear infinite; margin-left: 10px;
                display: none;
            }
            @keyframes pf-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }

    class PayFlowWidget {
        constructor() {
            injectStyles();
            this.config = {};
            this.overlay = null;
        }

        checkout(config) {
            this.config = config;
            this.render();
            setTimeout(() => {
                this.overlay.classList.add('visible');
            }, 10);
        }

        render() {
            if (this.overlay) this.close();

            const overlay = document.createElement('div');
            overlay.id = 'payflow-modal-overlay';
            overlay.innerHTML = `
                <div id="payflow-modal">
                    <div class="pf-header">
                        <div class="pf-title">Pay with M-Pesa</div>
                        <div class="pf-close">&times;</div>
                    </div>
                    <div class="pf-amount">${this.config.amount.toLocaleString()} KES</div>
                    
                    <div id="pf-step-input">
                        <div class="pf-input-group">
                            <label class="pf-label">M-Pesa Number</label>
                            <input type="tel" id="pf-phone" class="pf-input" placeholder="2547..." value="254">
                            <div class="pf-error" id="pf-error-msg"></div>
                        </div>
                        <button id="pf-pay-btn" class="pf-btn">
                            Pay Now <div class="pf-spinner"></div>
                        </button>
                    </div>

                    <div id="pf-step-success" class="pf-success" style="display:none">
                        <svg style="width:64px;height:64px;margin:0 auto 16px;color:#22c55e" fill="none" class="w-16 h-16 text-green-500 mx-auto mb-4" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 style="font-size:1.25rem;font-weight:600;margin-bottom:8px">Check your phone</h3>
                        <p style="color:#94a3b8">An M-Pesa STK push has been sent to your phone. Enter your PIN to complete the payment.</p>
                        <button class="pf-btn" style="margin-top:20px;background:#334155" onclick="PayFlow.close()">Close</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            this.overlay = overlay;

            // Events
            overlay.querySelector('.pf-close').onclick = () => this.close();
            overlay.querySelector('#pf-pay-btn').onclick = () => this.initiatePayment();
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.close();
            });
        }

        close() {
            if (!this.overlay) return;
            this.overlay.classList.remove('visible');
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 300);
        }

        async initiatePayment() {
            const phoneInput = this.overlay.querySelector('#pf-phone');
            const phone = phoneInput.value;
            const btn = this.overlay.querySelector('#pf-pay-btn');
            const spinner = btn.querySelector('.pf-spinner');
            const errorMsg = this.overlay.querySelector('#pf-error-msg');
            const stepInput = this.overlay.querySelector('#pf-step-input');
            const stepSuccess = this.overlay.querySelector('#pf-step-success');

            // Validation
            if (!phone.match(/^254\d{9}$/)) {
                errorMsg.textContent = "Please enter a valid M-Pesa number (e.g. 254712345678)";
                errorMsg.style.display = 'block';
                return;
            }
            errorMsg.style.display = 'none';

            // Loading state
            btn.disabled = true;
            spinner.style.display = 'block';
            btn.innerHTML = '<span>Processing...</span> <div class="pf-spinner"></div>';

            try {
                const response = await fetch(`${API_BASE_URL}/payment/initiate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: this.config.amount,
                        phone: phone,
                        merchantId: this.config.merchantId
                    })
                });

                const data = await response.json();

                if (data.success) {
                    stepInput.style.display = 'none';
                    stepSuccess.style.display = 'block';
                    // Auto-close after 5 seconds
                    setTimeout(() => this.close(), 5000);
                } else {
                    throw new Error(data.message || 'Payment initiation failed');
                }

            } catch (err) {
                console.error('Payment Error:', err);
                errorMsg.textContent = err.message || "Something went wrong. Please try again.";
                errorMsg.style.display = 'block';
                btn.disabled = false;
                spinner.style.display = 'none';
                btn.innerHTML = '<span>Pay Now</span> <div class="pf-spinner"></div>';
            }
        }
    }

    window.PayFlow = new PayFlowWidget();

})(window);
