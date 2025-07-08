// MONO Democracy Machine V4 - Production Ready Vue.js Logic
const { createApp, ref, computed, nextTick } = Vue;

// Vue App
createApp({
    setup() {
        // Reactive state
        const email = ref('');
        const emailSubmitting = ref(false);
        const selectedTalk = ref(null);
        const showEmailModal = ref(true);
        const showCompletionModal = ref(false);
        const pendingVoteTalk = ref(null);
        const votedTalkIds = ref(new Set());
        const talks = ref([...talkData]); // Using data from talks.js
        const emailVerified = ref(false);

        // Computed properties
        const votesRemaining = computed(() => {
            return 5 - votedTalkIds.value.size;
        });

        const votedTalks = computed(() => {
            return talks.value.filter(talk => talk.voted);
        });

        const votingComplete = computed(() => {
            return votesRemaining.value === 0;
        });

        // Methods
        const handleVoteClick = async (talk) => {
            if (!emailVerified.value) {
                // Show email modal first
                pendingVoteTalk.value = talk;
                showEmailModal.value = true;
                await nextTick();
                const emailInput = document.querySelector('input[type="email"]');
                if (emailInput) emailInput.focus();
                return;
            }
            
            toggleVote(talk);
        };

        const toggleVote = (talk) => {
            if (talk.voted) {
                // Remove vote
                talk.voted = false;
                votedTalkIds.value.delete(talk.id);
            } else {
                // Add vote (if slots available)
                if (votesRemaining.value > 0) {
                    talk.voted = true;
                    votedTalkIds.value.add(talk.id);
                    
                    // Add visual feedback
                    const talkElement = document.querySelector(`[data-talk-id="${talk.id}"]`);
                    if (talkElement) {
                        talkElement.classList.add('animate-vote-pulse');
                        setTimeout(() => {
                            talkElement.classList.remove('animate-vote-pulse');
                        }, 600);
                    }
                }
            }
            
            // Show completion modal when 5 votes are cast
            if (votesRemaining.value === 0) {
                setTimeout(() => {
                    showCompletionModal.value = true;
                }, 800); // Small delay for better UX
            }
        };

        const submitEmail = async () => {
            if (!email.value) return;
            
            emailSubmitting.value = true;
            
            try {
                // Here you'll replace with actual API call to your Cloudflare Worker
                // const response = await fetch('https://hardware-voting-api-staging.forsakenlegacy.workers.dev/api/vote', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         email: email.value,
                //         talkId: pendingVoteTalk.value?.id
                //     })
                // });
                
                // Simulate API call for now
                // await new Promise(resolve => setTimeout(resolve, 200));
                
                // For development, store in localStorage
                // emailVerified.value = true;
                // showEmailModal.value = false;
                
                // If there was a pending vote, execute it
                if (pendingVoteTalk.value) {
                    toggleVote(pendingVoteTalk.value);
                    pendingVoteTalk.value = null;
                }
                
            } catch (error) {
                console.error('Error submitting vote:', error);
                // Show user-friendly error message instead of alert
                showNotification('Unable to submit vote. Please try again.', 'error');
            } finally {
                emailSubmitting.value = false;
            }
        };

        const cancelEmailEntry = () => {
            showEmailModal.value = false;
            pendingVoteTalk.value = null;
            email.value = '';
        };

        const proceedToEmailVerification = () => {
            showCompletionModal.value = false;
            submitAllVotes();
        };

        const showVerificationPrompt = () => {
            if (votedTalks.value.length === 0) return;
            submitAllVotes();
        };

        const submitAllVotes = async () => {
            const votes = votedTalks.value.map(talk => ({
                id: talk.id,
                title: talk.title,
                type: talk.type
            }));
            
            try {
                // Here you'll replace with actual API call to your Cloudflare Worker
                const response = await fetch('https://hardware-voting-api-staging.forsakenlegacy.workers.dev/api/vote', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email.value,
                        votes: votes,
                        timestamp: new Date().toISOString()
                    })
                });
                
                console.log('SUBMITTING VOTES:', { 
                    email: email.value, 
                    votes,
                    timestamp: new Date().toISOString()
                });
                
                // For development, store in localStorage
                //localStorage.setItem(`voted_${email.value}`, JSON.stringify({
                //    votes,
                //    timestamp: new Date().toISOString(),
                //    verified: emailVerified.value
                //}));
                
                // Show success notification
                showNotification('Votes submitted successfully! Check your email to verify.', 'success');
                
            } catch (error) {
                console.error('Error submitting votes:', error);
                showNotification('Unable to submit votes. Please try again.', 'error');
            }
        };

        const openModal = (talk) => {
            selectedTalk.value = talk;
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            selectedTalk.value = null;
            document.body.style.overflow = 'auto';
        };

        const formatDescription = (description) => {
            if (!description) return '';
            
            // Convert line breaks to <br> tags
            let formatted = description.replace(/\n/g, '<br>');
            
            // Convert bullet points to proper list items
            formatted = formatted.replace(/^•\s+(.+)$/gm, '<li>$1</li>');
            
            // Wrap consecutive list items in <ul> tags
            formatted = formatted.replace(/(<li>.*<\/li>(?:<br>)*)+/gs, (match) => {
                const cleanMatch = match.replace(/<br>/g, '');
                return `<ul class="list-disc list-inside my-2 space-y-1">${cleanMatch}</ul>`;
            });
            
            // Convert paragraphs (double line breaks)
            formatted = formatted.replace(/(<br>){2,}/g, '</p><p class="mb-4">');
            
            // Wrap in paragraph tags if not already wrapped
            if (!formatted.startsWith('<p') && !formatted.startsWith('<ul')) {
                formatted = `<p class="mb-4">${formatted}</p>`;
            }
            
            return formatted;
        };

        // Notification system (replaces alerts)
        const showNotification = (message, type = 'info') => {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 p-4 border-2 border-black font-mono text-sm max-w-sm animate-scale-in ${
                type === 'success' ? 'bg-green-100 text-green-800' : 
                type === 'error' ? 'bg-red-100 text-red-800' : 
                'bg-blue-100 text-blue-800'
            }`;
            
            notification.innerHTML = `
                <div class="flex items-center justify-between">
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-lg font-bold">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        };

        // Keyboard shortcuts
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                if (selectedTalk.value) {
                    closeModal();
                } else if (showEmailModal.value) {
                    cancelEmailEntry();
                } else if (showCompletionModal.value) {
                    showCompletionModal.value = false;
                }
            }
        };

        // Utility functions
        const getVotingStats = () => {
            const totalVotes = talks.value.reduce((sum, talk) => sum + (talk.voted ? 1 : 0), 0);
            return {
                totalTalks: talks.value.length,
                votedTalks: totalVotes,
                remainingVotes: 5 - totalVotes
            };
        };

        const resetVotes = () => {
            talks.value.forEach(talk => {
                talk.voted = false;
            });
            votedTalkIds.value.clear();
        };

        const exportVotes = () => {
            const votes = votedTalks.value.map(talk => ({
                id: talk.id,
                title: talk.title,
                type: talk.type,
                url: talk.url
            }));
            
            const dataStr = JSON.stringify({
                email: email.value,
                votes,
                timestamp: new Date().toISOString(),
                verified: emailVerified.value
            }, null, 2);
            
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `hardware-devroom-votes-${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        };

        // Check for existing voter on load
        const checkExistingVoter = () => {
            const currentVoter = localStorage.getItem('current_voter');
            if (currentVoter) {
                email.value = currentVoter;
                emailVerified.value = true;
                
                // Restore any existing votes
                const existingVotes = localStorage.getItem(`voted_${currentVoter}`);
                if (existingVotes) {
                    try {
                        const voteData = JSON.parse(existingVotes);
                        voteData.votes.forEach(vote => {
                            const talk = talks.value.find(t => t.id === vote.id);
                            if (talk) {
                                talk.voted = true;
                                votedTalkIds.value.add(vote.id);
                            }
                        });
                    } catch (error) {
                        console.error('Error restoring votes:', error);
                    }
                }
            }
        };

        // Lifecycle hooks
        window.addEventListener('keydown', handleKeydown);
        
        // Check for existing voter when app loads
        checkExistingVoter();
        
        // Clean up on unmount
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('keydown', handleKeydown);
        });

        // Return reactive data and methods
        return {
            // Data
            email,
            emailVerified,
            emailSubmitting,
            selectedTalk,
            showEmailModal,
            showCompletionModal,
            talks,
            votedTalkIds,
            
            // Computed
            votesRemaining,
            votedTalks,
            votingComplete,
            
            // Methods
            handleVoteClick,
            toggleVote,
            submitEmail,
            cancelEmailEntry,
            proceedToEmailVerification,
            showVerificationPrompt,
            submitAllVotes,
            openModal,
            closeModal,
            formatDescription,
            showNotification,
            getVotingStats,
            resetVotes,
            exportVotes
        };
    }
}).mount('#app');

// Debug helpers for development
window.debugVoting = {
    clearStorage: () => {
        localStorage.clear();
        location.reload();
    },
    simulateVotes: (email, talkIds) => {
        localStorage.setItem(`voted_${email}`, JSON.stringify({
            votes: talkIds.map(id => ({ id, title: `Talk ${id}` })),
            timestamp: new Date().toISOString(),
            verified: true
        }));
    },
    getStoredVotes: () => {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('voted_'));
        return keys.map(key => ({
            email: key.replace('voted_', ''),
            data: JSON.parse(localStorage.getItem(key))
        }));
    },
    exportAllVotes: () => {
        const allVotes = window.debugVoting.getStoredVotes();
        const dataStr = JSON.stringify(allVotes, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `all-hardware-devroom-votes-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    },
    testNotification: (message, type) => {
        // Test the notification system
        const app = document.querySelector('#app').__vueParentComponent.ctx;
        app.showNotification(message || 'Test notification', type || 'info');
    }
};