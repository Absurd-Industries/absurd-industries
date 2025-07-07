// MONO Democracy Machine V3 - Main Vue.js Logic
const { createApp, ref, computed, nextTick } = Vue;

// Vue App
createApp({
    setup() {
        // Reactive state
        const email = ref('');
        const emailVerified = ref(false);
        const emailSubmitting = ref(false);
        const selectedTalk = ref(null);
        const showEmailModal = ref(false);
        const pendingVoteTalk = ref(null);
        const votedTalkIds = ref(new Set());
        const talks = ref([...talkData]); // Using data from talks.js

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
                if (this.$refs.emailInput) {
                    this.$refs.emailInput.focus();
                }
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
            
            // Auto-submit when 5 votes are cast
            if (votesRemaining.value === 0) {
                setTimeout(() => {
                    submitVotes();
                }, 300);
            }
        };

        const verifyEmail = async () => {
            if (!email.value) return;
            
            emailSubmitting.value = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Check if email already voted (mock check)
                const hasVoted = localStorage.getItem(`voted_${email.value}`);
                if (hasVoted) {
                    alert('THIS EMAIL HAS ALREADY VOTED. ONE VOTE PER EMAIL ADDRESS.');
                    return;
                }
                
                emailVerified.value = true;
                localStorage.setItem(`current_voter`, email.value);
                showEmailModal.value = false;
                
                // If there was a pending vote, execute it
                if (pendingVoteTalk.value) {
                    toggleVote(pendingVoteTalk.value);
                    pendingVoteTalk.value = null;
                }
                
            } catch (error) {
                alert('ERROR VERIFYING EMAIL. PLEASE TRY AGAIN.');
            } finally {
                emailSubmitting.value = false;
            }
        };

        const cancelEmailEntry = () => {
            showEmailModal.value = false;
            pendingVoteTalk.value = null;
            email.value = '';
        };

        const showVerificationPrompt = () => {
            if (votedTalks.value.length === 0) return;
            
            const message = `You have selected ${votedTalks.value.length} talk(s). Click OK to verify your email and submit your votes.`;
            if (confirm(message)) {
                submitVotes();
            }
        };

        const submitVotes = async () => {
            const votes = votedTalks.value.map(talk => ({
                id: talk.id,
                title: talk.title,
                type: talk.type
            }));
            
            try {
                console.log('SUBMITTING VOTES:', { 
                    email: email.value, 
                    votes,
                    timestamp: new Date().toISOString(),
                    verified: emailVerified.value
                });
                
                // Mark this email as having voted
                localStorage.setItem(`voted_${email.value}`, JSON.stringify({
                    votes,
                    timestamp: new Date().toISOString(),
                    verified: emailVerified.value
                }));
                
                // Here you would replace this with actual API call:
                // await fetch('/api/submit-votes', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ 
                //         email: email.value, 
                //         votes,
                //         timestamp: new Date().toISOString(),
                //         verified: emailVerified.value
                //     })
                // });
                
                alert('VOTES SUBMITTED SUCCESSFULLY! Thank you for participating in the democratic process.');
                console.log('VOTES SUBMITTED SUCCESSFULLY');
                
            } catch (error) {
                console.error('Error submitting votes:', error);
                alert('ERROR SUBMITTING VOTES. PLEASE TRY AGAIN.');
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

        // Keyboard shortcuts
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                if (selectedTalk.value) {
                    closeModal();
                } else if (showEmailModal.value) {
                    cancelEmailEntry();
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
            talks,
            votedTalkIds,
            
            // Computed
            votesRemaining,
            votedTalks,
            votingComplete,
            
            // Methods
            handleVoteClick,
            toggleVote,
            verifyEmail,
            cancelEmailEntry,
            showVerificationPrompt,
            submitVotes,
            openModal,
            closeModal,
            formatDescription,
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
    }
};