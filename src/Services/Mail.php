<?php
/**
 * Created by PhpStorm.
 * User: arthurgeay
 * Date: 25/05/2020
 * Time: 19:47
 */

namespace App\Services;


use Twig\Environment;

class Mail
{
    private $mailer;
    private $twig;

    public function __construct(\Swift_Mailer $mailer, Environment $twig) {

        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function sendMail($subject, $recipient, $view, $params = null, $file = null)
    {
        $message = (new \Swift_Message($subject))
            ->setFrom('limonproject44@gmail.com')
            ->setTo($recipient)
            ->setBody($this->twig->render($view, $params), 'text/html')
        ;

        if($file) {
            $attachment = new \Swift_Attachment($file['file'], $file['filename'], $file['content-type']);
            $message->attach($attachment);
        }

        $this->mailer->send($message);
    }
}