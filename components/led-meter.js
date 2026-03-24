/**
 * Decorative stereo LED level meter (vintage deck style).
 * Mount: any element with id="led-meter-root" or class led-meter-mount.
 */
(function () {
    'use strict';

    var SEGMENTS = 10;
    var prefersReducedMotion = false;

    function mqReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function buildMeter() {
        var segsL = '';
        var segsR = '';
        var nums = '<span class="slf-led-meter__nums-spacer" aria-hidden="true"></span>';
        var i;
        for (i = 1; i <= SEGMENTS; i++) {
            segsL += '<span class="slf-led-meter__seg" data-i="' + i + '" aria-hidden="true"></span>';
            segsR += '<span class="slf-led-meter__seg" data-i="' + i + '" aria-hidden="true"></span>';
            nums += '<span class="slf-led-meter__num">' + i + '</span>';
        }
        return (
            '<div class="slf-led-meter" role="img" aria-label="Animated decorative stereo level display">' +
            '<div class="slf-led-meter__title">LED POWER METER / BATT.CHECK</div>' +
            '<div class="slf-led-meter__face">' +
            '<div class="slf-led-meter__row">' +
            '<span class="slf-led-meter__ch-badge">L</span>' +
            '<div class="slf-led-meter__led-row" data-channel="l">' + segsL + '</div>' +
            '</div>' +
            '<div class="slf-led-meter__nums">' + nums + '</div>' +
            '<div class="slf-led-meter__row">' +
            '<span class="slf-led-meter__ch-badge">R</span>' +
            '<div class="slf-led-meter__led-row" data-channel="r">' + segsR + '</div>' +
            '</div>' +
            '<div class="slf-led-meter__batt-wrap">' +
            '<span class="slf-led-meter__batt-spacer" aria-hidden="true"></span>' +
            '<div class="slf-led-meter__batt-bracket" aria-hidden="true"></div>' +
            '<span class="slf-led-meter__batt-label">BATT.CHECK</span>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function setSegState(seg, level) {
        var idx = parseInt(seg.getAttribute('data-i'), 10);
        seg.classList.remove('slf-led-meter__seg--on', 'slf-led-meter__seg--dim');
        if (level >= idx) {
            seg.classList.add('slf-led-meter__seg--on');
        } else if (level >= idx - 0.65) {
            seg.classList.add('slf-led-meter__seg--dim');
        }
    }

    function clamp(n, a, b) {
        return Math.max(a, Math.min(b, n));
    }

    function initInto(mount) {
        if (!mount) return;
        mount.innerHTML = buildMeter();
        prefersReducedMotion = mqReducedMotion();

        var rowL = mount.querySelector('[data-channel="l"]');
        var rowR = mount.querySelector('[data-channel="r"]');
        var segsL = rowL ? rowL.querySelectorAll('.slf-led-meter__seg') : [];
        var segsR = rowR ? rowR.querySelectorAll('.slf-led-meter__seg') : [];

        var levelL = 4;
        var levelR = 3.5;
        var targetL = 5;
        var targetR = 4.5;
        var t = 0;
        var lastTick = 0;
        var tickMs = 90;

        function pickTarget(base, phase) {
            var wobble = Math.sin(t * 0.002 + phase) * 2.2;
            var bump = Math.sin(t * 0.008 + phase * 1.7) * 1.4;
            var spike = Math.random() < 0.12 ? Math.random() * 3.5 : 0;
            return clamp(base + wobble + bump + spike, 0.5, SEGMENTS + 0.35);
        }

        function frame(now) {
            if (!lastTick) lastTick = now;
            var elapsed = now - lastTick;
            if (elapsed >= tickMs) {
                lastTick = now;
                t += elapsed;
                if (!prefersReducedMotion) {
                    targetL = pickTarget(5.5, 0);
                    targetR = pickTarget(5.2, 2.1);
                } else {
                    targetL = 4;
                    targetR = 4;
                }
            }

            var smooth = prefersReducedMotion ? 0.2 : 0.28;
            levelL += (targetL - levelL) * smooth;
            levelR += (targetR - levelR) * smooth;

            var i;
            for (i = 0; i < segsL.length; i++) {
                setSegState(segsL[i], levelL);
            }
            for (i = 0; i < segsR.length; i++) {
                setSegState(segsR[i], levelR);
            }

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);

        if (window.matchMedia) {
            var mql = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mql.addEventListener) {
                mql.addEventListener('change', function () {
                    prefersReducedMotion = mql.matches;
                });
            } else if (mql.addListener) {
                mql.addListener(function () {
                    prefersReducedMotion = mql.matches;
                });
            }
        }
    }

    function init() {
        var byId = document.getElementById('led-meter-root');
        if (byId) {
            initInto(byId);
            return;
        }
        var mounts = document.querySelectorAll('.led-meter-mount');
        for (var i = 0; i < mounts.length; i++) {
            initInto(mounts[i]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
